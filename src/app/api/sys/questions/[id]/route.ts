import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET - Ambil question berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID question tidak valid" },
        { status: 400 }
      );
    }
    
    const selectQuery = `
      SELECT 
        q.id,
        q.title,
        q.content,
        q.category_id,
        c.name as category_name,
        t.title as tryout_title,
        q.type,
        q.difficulty,
        q.weight,
        q.is_active,
        q.created_at,
        q.updated_at
      FROM questions q
      JOIN categories c ON q.category_id = c.id
      JOIN tryouts t ON c.tryout_id = t.id
      WHERE q.id = ?
    `;
    
    const questions = await query(selectQuery, [id]) as any[];
    
    if (questions.length === 0) {
      return NextResponse.json(
        { success: false, message: "Question tidak ditemukan" },
        { status: 404 }
      );
    }
    
    // Ambil answers untuk question ini
    const answersQuery = `
      SELECT id, question_id, content, is_correct
      FROM answers 
      WHERE question_id = ?
      ORDER BY id
    `;
    const answers = await query(answersQuery, [id]) as any[];
    
    const question = { ...questions[0], answers };
    
    return NextResponse.json({
      success: true,
      data: question
    });
    
  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data question" },
      { status: 500 }
    );
  }
}

// PUT - Update question
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID question tidak valid" },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    const {
      title,
      content,
      category_id,
      type,
      difficulty,
      weight,
      is_active,
      answers
    } = body;
    
    // Validasi input
    if (!title || !content || !category_id || !type || !difficulty || !weight) {
      return NextResponse.json(
        { success: false, message: "Semua field wajib diisi" },
        { status: 400 }
      );
    }
    
    if (!answers || answers.length === 0) {
      return NextResponse.json(
        { success: false, message: "Question harus memiliki minimal 1 jawaban" },
        { status: 400 }
      );
    }
    
    // Cek apakah ada jawaban yang benar
    const hasCorrectAnswer = answers.some((answer: any) => answer.is_correct);
    if (!hasCorrectAnswer) {
      return NextResponse.json(
        { success: false, message: "Question harus memiliki minimal 1 jawaban yang benar" },
        { status: 400 }
      );
    }
    
    // Mulai transaction
    const connection = await (await import("@/lib/db")).default.getConnection();
    await connection.beginTransaction();
    
    try {
      // Ambil data question lama untuk update stats
      const oldQuestionQuery = "SELECT category_id, weight FROM questions WHERE id = ?";
      const [oldQuestionRows] = await connection.execute(oldQuestionQuery, [id]) as any;
      
      if (!oldQuestionRows || oldQuestionRows.length === 0) {
        throw new Error("Question tidak ditemukan");
      }
      
      const oldQuestion = oldQuestionRows[0];
      const oldCategoryId = oldQuestion.category_id;
      const oldWeight = oldQuestion.weight;
      
      // Validasi data lama
      if (oldCategoryId === undefined || oldCategoryId === null || oldWeight === undefined || oldWeight === null) {
        console.error("Invalid old question data:", { oldCategoryId, oldWeight, oldQuestion });
        throw new Error("Data question lama tidak valid");
      }
      
      // Update question
      const questionQuery = `
        UPDATE questions 
        SET 
          title = ?,
          content = ?,
          category_id = ?,
          type = ?,
          difficulty = ?,
          weight = ?,
          is_active = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      
      await connection.execute(questionQuery, [
        title,
        content,
        category_id,
        type,
        difficulty,
        weight,
        is_active ? 1 : 0,
        id
      ]);
      
      // Hapus answers lama
      await connection.execute("DELETE FROM answers WHERE question_id = ?", [id]);
      
      // Insert answers baru
      const answerQuery = `
        INSERT INTO answers (question_id, content, is_correct) 
        VALUES (?, ?, ?)
      `;
      
      for (const answer of answers) {
        await connection.execute(answerQuery, [
          id,
          answer.content,
          answer.is_correct ? 1 : 0
        ]);
      }
      
      // Update category stats (hapus dari category lama, tambah ke category baru)
      if (oldCategoryId !== category_id) {
        // Update category lama
        const updateOldCategoryQuery = `
          UPDATE categories 
          SET 
            total_questions = total_questions - 1,
            total_weight = total_weight - ?,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `;
        await connection.execute(updateOldCategoryQuery, [oldWeight, oldCategoryId]);
        
        // Update category baru
        const updateNewCategoryQuery = `
          UPDATE categories 
          SET 
            total_questions = total_questions + 1,
            total_weight = total_weight + ?,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `;
        await connection.execute(updateNewCategoryQuery, [weight, category_id]);
        
        // Update tryout stats untuk category lama
        const updateOldTryoutQuery = `
          UPDATE tryouts t
          JOIN categories c ON c.tryout_id = t.id
          SET 
            t.total_questions = t.total_questions - 1,
            t.total_weight = t.total_weight - ?,
            t.updated_at = CURRENT_TIMESTAMP
          WHERE c.id = ?
        `;
        await connection.execute(updateOldTryoutQuery, [oldWeight, oldCategoryId]);
        
        // Update tryout stats untuk category baru
        const updateNewTryoutQuery = `
          UPDATE tryouts t
          JOIN categories c ON c.tryout_id = t.id
          SET 
            t.total_questions = t.total_questions + 1,
            t.total_weight = t.total_weight + ?,
            t.updated_at = CURRENT_TIMESTAMP
          WHERE c.id = ?
        `;
        await connection.execute(updateNewTryoutQuery, [weight, category_id]);
      } else if (oldWeight !== weight) {
        // Update weight saja jika category sama
        const weightDiff = weight - oldWeight;
        
        const updateCategoryQuery = `
          UPDATE categories 
          SET 
            total_weight = total_weight + ?,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `;
        await connection.execute(updateCategoryQuery, [weightDiff, category_id]);
        
        const updateTryoutQuery = `
          UPDATE tryouts t
          JOIN categories c ON c.tryout_id = t.id
          SET 
            t.total_weight = t.total_weight + ?,
            t.updated_at = CURRENT_TIMESTAMP
          WHERE c.id = ?
        `;
        await connection.execute(updateTryoutQuery, [weightDiff, category_id]);
      }
      
      await connection.commit();
      
      return NextResponse.json({
        success: true,
        message: "Question berhasil diupdate"
      });
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
    
  } catch (error) {
    console.error("Error updating question:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengupdate question" },
      { status: 500 }
    );
  }
}

// DELETE - Hapus question
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID question tidak valid" },
        { status: 400 }
      );
    }
    
    // Mulai transaction
    const connection = await (await import("@/lib/db")).default.getConnection();
    await connection.beginTransaction();
    
    try {
      // Ambil data question untuk update stats
      const questionQuery = "SELECT category_id, weight FROM questions WHERE id = ?";
      const [questionRows] = await connection.execute(questionQuery, [id]) as any;
      
      if (!questionRows || questionRows.length === 0) {
        throw new Error("Question tidak ditemukan");
      }
      
      const questionData = questionRows[0];
      const category_id = questionData.category_id;
      const weight = questionData.weight;
      
      // Validasi data
      if (category_id === undefined || category_id === null || weight === undefined || weight === null) {
        console.error("Invalid question data for delete:", { category_id, weight, questionData });
        throw new Error("Data question tidak valid");
      }
      
      // Hapus answers
      await connection.execute("DELETE FROM answers WHERE question_id = ?", [id]);
      
      // Hapus question
      await connection.execute("DELETE FROM questions WHERE id = ?", [id]);
      
      // Update category stats
      const updateCategoryQuery = `
        UPDATE categories 
        SET 
          total_questions = total_questions - 1,
          total_weight = total_weight - ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      await connection.execute(updateCategoryQuery, [weight, category_id]);
      
      // Update tryout stats
      const updateTryoutQuery = `
        UPDATE tryouts t
        JOIN categories c ON c.tryout_id = t.id
        SET 
          t.total_questions = t.total_questions - 1,
          t.total_weight = t.total_weight - ?,
          t.updated_at = CURRENT_TIMESTAMP
        WHERE c.id = ?
      `;
      await connection.execute(updateTryoutQuery, [weight, category_id]);
      
      await connection.commit();
      
      return NextResponse.json({
        success: true,
        message: "Question berhasil dihapus"
      });
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
    
  } catch (error) {
    console.error("Error deleting question:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus question" },
      { status: 500 }
    );
  }
}
