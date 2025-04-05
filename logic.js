var projectsArray = null;

const customFunctions = {
    'projLoad' : renderEventSquares
}

function renderEventSquares() {
    console.log('tripped custom code yoo')
    const container = document.getElementById('projLoad');

  
    projectsArray.forEach(event => {
      const box = document.createElement('div');
      box.classList.add('project_listing')
  
      const title = document.createElement('span');
      title.classList.add('project_title')
      title.textContent = event.title;
   
      const timerange = document.createElement('div');
      timerange.classList.add('project_timerange')
      timerange.textContent = event.timerange;
  
      box.appendChild(title);
      box.appendChild(timerange);
      container.appendChild(box);
    });
  }

function CheckForCustomCode(){
    const container = document.getElementById('content');
    
    container.querySelectorAll('.entity').forEach(el => {
        console.log(el)
        customFunctions[el.id]()
      });
      
}

async function fetchProjects() {
    const res = await fetch('works.csv');
    const text = await res.text();
    const lines = text.trim().split('\n');
    
    // Skip the header line (assumed to be the first)
    return lines.slice(1).map(line => {
      const [title, description, alias, timerange] = line.split(',');
      return { title, description, alias, timerange };
    });
  }

function loadHTML(fileName) {
    return new Promise((resolve, reject) => {
        fetch(fileName)
            .then(response => response.text())
            .then(html => {
                const content = document.querySelector("#content");
                content.style.opacity = 0;

                setTimeout(() => {
                    content.innerHTML = html;

                    setTimeout(() => {
                        content.style.opacity = 1;
                        resolve();
                    }, 200); // fade-in duration
                }, 200); // wait for DOM to catch up
            })
            .catch(reject);
    });
}



function setupClickListeners() {
    const spans = document.querySelectorAll('span.content_replacement[href]');
    spans.forEach(span => {
        span.addEventListener('click', function() {
            loadHTML(span.getAttribute('href')).then(() => {console.log('loaded');CheckForCustomCode()});;
        });
    });
}


const pageLoaded = new Promise((resolve) => {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        resolve();
    } else {
        document.addEventListener("DOMContentLoaded", resolve, { once: true });
    }
});

pageLoaded.then(() => {
    setupClickListeners();
    loadHTML('home.html');
    fetchProjects().then((data) => projectsArray = data);
});
