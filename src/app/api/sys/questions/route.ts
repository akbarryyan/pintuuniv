import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET - Ambil semua questions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "all";
    const type = searchParams.get("type") || "all";
    const difficulty = searchParams.get("difficulty") || "all";
    const status = searchParams.get("status") || "all";
    
    const offset = (page - 1) * limit;
    
    let whereClause = "WHERE 1=1";
    const params: any[] = [];
    
    if (search) {
      whereClause += " AND (q.title LIKE ? OR q.content LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }
    
    if (category !== "all") {
      whereClause += " AND q.category_id = ?";
      params.push(category);
    }
    
    if (type !== "all") {
      whereClause += " AND q.type = ?";
      params.push(type);
    }
    
    if (difficulty !== "all") {
      whereClause += " AND q.difficulty = ?";
      params.push(difficulty);
    }
    
    if (status !== "all") {
      whereClause += " AND q.is_active = ?";
      params.push(status === "active" ? 1 : 0);
    }
    
    // Hitung total questions
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM questions q 
      JOIN categories c ON q.category_id = c.id 
      JOIN tryouts t ON c.tryout_id = t.id 
      ${whereClause}
    `;
    const countResult = await query(countQuery, params) as any[];
    const total = countResult[0]?.total || 0;
    
    // Ambil data questions dengan pagination
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
      ${whereClause}
      ORDER BY q.created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    const questions = await query(selectQuery, [...params, limit, offset]) as any[];
    
    // Ambil answers untuk setiap question
    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        const answersQuery = `
          SELECT id, question_id, content, is_correct, \`order\`
          FROM answers 
          WHERE question_id = ?
          ORDER BY \`order\`
        `;
        const answers = await query(answersQuery, [question.id]) as any[];
        return { ...question, answers };
      })
    );
    
    return NextResponse.json({
      success: true,
      data: questionsWithAnswers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data questions" },
      { status: 500 }
    );
  }
}

// POST - Buat question baru
export async function POST(request: NextRequest) {
  try {
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
      // Insert question
      const questionQuery = `
        INSERT INTO questions (
          title, content, category_id, type, difficulty, weight, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      const questionResult = await connection.execute(questionQuery, [
        title,
        content,
        category_id,
        type,
        difficulty,
        weight,
        is_active ? 1 : 0
      ]) as any;
      
      const questionId = questionResult[0].insertId;
      
      // Insert answers
      const answerQuery = `
        INSERT INTO answers (question_id, content, is_correct, \`order\`) 
        VALUES (?, ?, ?, ?)
      `;
      
      for (const answer of answers) {
        await connection.execute(answerQuery, [
          questionId,
          answer.content,
          answer.is_correct ? 1 : 0,
          answer.order || 1
        ]);
      }
      
      // Update category stats
      const updateCategoryQuery = `
        UPDATE categories 
        SET 
          total_questions = total_questions + 1,
          total_weight = total_weight + ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      
      await connection.execute(updateCategoryQuery, [weight, category_id]);
      
      // Update tryout stats
      const updateTryoutQuery = `
        UPDATE tryouts t
        JOIN categories c ON c.tryout_id = t.id
        SET 
          t.total_questions = t.total_questions + 1,
          t.total_weight = t.total_weight + ?,
          t.updated_at = CURRENT_TIMESTAMP
        WHERE c.id = ?
      `;
      
      await connection.execute(updateTryoutQuery, [weight, category_id]);
      
      await connection.commit();
      
      return NextResponse.json({
        success: true,
        message: "Question berhasil dibuat",
        data: { id: questionId }
      });
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
    
  } catch (error) {
    console.error("Error creating question:", error);
    return NextResponse.json(
      { success: false, message: "Gagal membuat question" },
      { status: 500 }
    );
  }
}
