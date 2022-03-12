function subjectId(subject) {
  const splittedSubject = subject.split("-");
  return Number(splittedSubject[splittedSubject.length - 1]);
}

export default function convertChecker(array) {
  const onlySubjects = array.filter(
    (element) => element.split("-")[0] === "subject"
  );

  const subjectIds = onlySubjects.map((element) => subjectId(element));

  return subjectIds;
}
