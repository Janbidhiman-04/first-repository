import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const aiService = {
  async generateTutorResponse(message: string, userLevel: string, subject?: string) {
    const model = "gemini-3-flash-preview";
    const prompt = `
      You are an expert AI Tutor for a student at the ${userLevel} level. 
      Subject: ${subject || 'General Learning'}.
      
      User Message: "${message}"
      
      Instructions:
      - Provide a grade-appropriate explanation.
      - Use simple language for lower levels (L1-L3) and more technical language for higher levels (L4-L7).
      - Include examples where possible.
      - If appropriate, suggest a small follow-up quiz or exercise.
      - Format your response using Markdown.
    `;

    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });
      return response.text || "I'm sorry, I couldn't generate a response at this time.";
    } catch (error) {
      console.error('AI Tutor Error:', error);
      return "I'm having trouble connecting to my brain right now. Please try again later!";
    }
  },

  async generatePsychologistResponse(mood: number, message: string) {
    const model = "gemini-3-flash-preview";
    const prompt = `
      You are a compassionate AI Psychologist for students. 
      The student reports a stress level of ${mood}/10.
      Student Message: "${message}"
      
      Instructions:
      - Be empathetic and supportive.
      - Provide simple coping strategies (e.g., breathing exercises).
      - Encourage the student and suggest positive actions.
      - Always include a disclaimer that you are an AI and not a replacement for professional help.
      - Format your response using Markdown.
    `;

    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });
      return response.text || "I'm here for you. Take a deep breath.";
    } catch (error) {
      console.error('AI Psychologist Error:', error);
      return "I'm here to listen, but I'm having a technical glitch. Remember to breathe!";
    }
  },

  async generateTimetable(examDate: string, studyHours: number, subjects: string[]) {
    const model = "gemini-3-flash-preview";
    const prompt = `
      Generate a weekly study timetable for a student.
      Exam Date: ${examDate}
      Daily Study Hours: ${studyHours}
      Subjects: ${subjects.join(', ')}
      
      Instructions:
      - Create a balanced schedule for 7 days.
      - Include breaks and subject rotation.
      - Provide the output in a clear Markdown table format.
    `;

    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });
      return response.text || "Failed to generate timetable.";
    } catch (error) {
      console.error('AI Timetable Error:', error);
      return "I couldn't create your timetable right now. Try listing your subjects again!";
    }
  },

  async summarizeYoutubeVideo(url: string) {
    const model = "gemini-3-flash-preview";
    const prompt = `
      The user has provided a YouTube URL: ${url}
      
      Instructions:
      - Since you cannot browse the live web directly in this specific mode without tools, please explain that you will summarize the video based on common knowledge if it's a well-known educational video, or ask the user to provide the transcript/key points for a detailed summary.
      - If the URL looks like a standard educational topic (e.g., "Photosynthesis"), provide a high-level summary of that topic as if it were the video content.
      - Provide 5 key takeaways.
      - Create a 3-question quiz based on the summary.
      - Format your response using Markdown.
    `;

    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });
      return response.text || "I couldn't summarize that video. Please check the link.";
    } catch (error) {
      console.error('AI YouTube Error:', error);
      return "I'm having trouble analyzing that video link right now.";
    }
  }
};
