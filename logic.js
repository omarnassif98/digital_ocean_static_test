var projectsArray = null;

const customFunctions = {
    'projLoad' : renderEventSquares
}

function renderEventSquares() {
    console.log('tripped custom code yoo')
    const container = document.getElementById('projLoad');
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.gap = '16px';
  
    projectsArray.forEach(event => {
      const box = document.createElement('div');
      box.style.width = '150px';
      box.style.height = '150px';
      box.style.borderRadius = '20px';
      box.style.background = '#f0f0f0';
      box.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
      box.style.display = 'flex';
      box.style.flexDirection = 'column';
      box.style.justifyContent = 'center';
      box.style.alignItems = 'center';
      box.style.padding = '10px';
      box.style.textAlign = 'center';
      box.style.fontFamily = 'sans-serif';
  
      const title = document.createElement('div');
      title.textContent = event.title;
      title.style.fontWeight = 'bold';
      title.style.marginBottom = '8px';
  
      const timerange = document.createElement('div');
      timerange.textContent = event.timerange;
      timerange.style.fontSize = '0.9em';
      timerange.style.color = '#555';
  
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
