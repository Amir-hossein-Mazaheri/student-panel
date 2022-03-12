export default function convertCategory(array) {
  return array.map((major) => ({
    title: major.name,
    key: `major-${major.id}`,
    children: major.grades.map((grade) => ({
      title: grade.name,
      key: `grade-${major.id}-${grade.id}`,
      children: grade.courses.map((course) => ({
        title: course.name,
        key: `course-${major.id}-${grade.id}-${course.id}`,
        children: course.subjects.map((subject) => ({
          title: subject.name,
          key: `subject-${major.id}-${grade.id}-${course.id}-${subject.id}`,
        })),
      })),
    })),
  }));
}
