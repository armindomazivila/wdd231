const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to programming fundamentals, including variables, decisions, calculations, loops, arrays, and input/output.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web, web design, and development using fundamental web technologies.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn to write, call, debug, and test functions to solve programming problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces classes, objects, encapsulation, inheritance, and polymorphism.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn to create dynamic websites using JavaScript, HTML, and CSS.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students focus on user experience, accessibility, performance optimization, and API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];



const courseList = document.querySelector('#course-list');
const creditTotal = document.querySelector('#credit-total');
const filterButtons = document.querySelectorAll('[data-filter]');


function displayCourses(filter = 'all') {

    if (!courseList || !creditTotal) {
        return;
    }

    // Select courses based on the filter
    const visibleCourses = filter === 'all'
        ? courses
        : courses.filter(course => course.subject === filter);

    // Clear previous course cards
    courseList.replaceChildren();

    // Create a card for each course
    visibleCourses.forEach(course => {

        const card = document.createElement('article');

        card.className = `course-card${course.completed ? ' completed' : ''}`;

        const heading = document.createElement('h3');
        heading.textContent = `${course.subject} ${course.number}`;

        const title = document.createElement('p');
        title.textContent = course.title;

        const credits = document.createElement('p');
        credits.textContent = `${course.credits} credits`;

        const status = document.createElement('p');
        status.textContent = course.completed ? 'Completed ✓' : 'In Progress';

        const description = document.createElement('p');
        description.textContent = course.description;

        const technology = document.createElement('p');
        technology.textContent = `Technologies: ${course.technology.join(', ')}`;

        // Add all information to the card
        card.append(
            heading,
            title,
            credits,
            status,
            description,
            technology
        );

        // Add the card to the course list
        courseList.append(card);
    });

    // Calculate total credits using reduce()
    const totalCredits = visibleCourses.reduce(
        (total, course) => total + course.credits,
        0
    );

    creditTotal.textContent = totalCredits;
}


filterButtons.forEach(button => {

    button.addEventListener('click', () => {

        // Update selected button
        filterButtons.forEach(item => {

            const selected = item === button;

            item.classList.toggle('selected', selected);

            item.setAttribute('aria-pressed', String(selected));

        });

        // Display filtered courses
        displayCourses(button.dataset.filter);

    });

});

displayCourses();