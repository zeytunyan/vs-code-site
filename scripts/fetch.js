refreshCourses();
setInterval(refreshCourses, 3600000);

async function refreshCourses() {
  const courses = await fetchCourses();
  setCourses(courses);
}

async function fetchCourses() {
  const coursesUrl =
    "https://learn.microsoft.com/api/catalog/?type=learningPaths&product=vs-code";

  try {
    const response = await fetch(coursesUrl);

    if (!response.ok) {
      console.warn(
        `Status: ${response.status}, Message: ${response.statusText}`
      );
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }

  return [];
}

function setCourses(courses) {
  const coursesContainer = document.querySelector(".courses-container");

  coursesContainer.innerHTML = "";

  courses.learningPaths.forEach((course) => {
    const courseElement = createCourseElement(
      course.icon_url,
      course.title,
      course.url
    );

    coursesContainer.append(courseElement);
  });
}

function createCourseElement(imgUrl, titleText, url) {
  const courseImage = document.createElement("div");
  courseImage.classList.add("course-image");
  courseImage.style.backgroundImage = `url('${imgUrl}')`;

  const courseTitle = document.createElement("strong");
  courseTitle.textContent = titleText;

  const courseElement = document.createElement("a");
  courseElement.classList.add("course");
  courseElement.href = url;
  
  courseElement.append(courseImage);
  courseElement.append(courseTitle);

  return courseElement;
}
