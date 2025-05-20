
export interface ContentType {
  code: string,
  example: string,
  explain: string,
  topic: string,
}
export interface ChapterType {
  chapterName: string,
  content: ContentType[],
}
export interface FlashCardType {
  back: string,
  front: string,
}
export interface QaType {
  answer: string,
  question: string,
}
export interface QuizType {
  correctAns: string,
  options: string[],
  question: string,
}
export interface CourseType {
  banner_image: string,
  category: string,
  chapters: ChapterType[],
  courseTitle: string,
  createdBy: string,
  createdOn: Date,
  description: string,
  flashcards: FlashCardType[],
  qa: QaType[],
  quiz: QuizType[],
  docId: string,
  completedChapter: string[],
}