const mainElement = document.querySelector('main');

fetch('../data.json')
  .then((data) => data.json())
  .then((jobs) => {
    jobs.forEach((job) => {
      // Create job-card dom for each job data
      const jobCard = document.createElement('article');
      jobCard.setAttribute('class', 'job-card');

      const jobImgContainer = document.createElement('div');
      jobImgContainer.setAttribute('class', 'job-img');
      const jobImg = document.createElement('img');
      jobImg.setAttribute('src', job.logo);
      jobImg.setAttribute('alt', job.company);
      jobImgContainer.appendChild(jobImg);
      jobCard.appendChild(jobImgContainer);

      const jobContent = document.createElement('div');
      jobContent.setAttribute('class', 'job-content');

      const header = document.createElement('header');
      const company = document.createElement('h3');
      company.setAttribute('class', 'company');
      const companyText = document.createTextNode(job.company);
      company.appendChild(companyText);

      const jobTags = document.createElement('div');
      jobTags.setAttribute('class', 'job-tags');

      const newTag = document.createElement('span');
      newTag.classList = `commercial-tag commercial-tag--new ${
        job.new ? 'active' : ''
      }`;
      const newTagText = document.createTextNode('New!');
      newTag.appendChild(newTagText);

      const featuredTag = document.createElement('span');
      featuredTag.classList = `commercial-tag commercial-tag--new ${
        job.featured ? 'active' : ''
      }`;
      const featuredTagText = document.createTextNode('Featured');
      featuredTag.appendChild(featuredTagText);

      jobTags.append(newTag, featuredTag);
      header.append(company, jobTags);
      jobContent.append(header);

      const jobInfo = document.createElement('div');
      jobInfo.classList.add('job-info');
      const position = document.createElement('h2');
      position.classList.add('position');
      const positionText = document.createTextNode(job.position);
      position.appendChild(positionText);

      const jobProps = document.createElement('ul');
      jobProps.classList.add('job-props');

      const jobProp1 = document.createElement('li');
      jobProp1.classList.add('job-prop');
      const jobProp1Text = document.createTextNode(job.postedAt);
      jobProp1.appendChild(jobProp1Text);

      const jobProp2 = document.createElement('li');
      jobProp2.classList.add('job-prop');
      const jobProp2Text = document.createTextNode(job.contract);
      jobProp2.appendChild(jobProp2Text);

      const jobProp3 = document.createElement('li');
      jobProp3.classList.add('job-prop');
      const jobProp3Text = document.createTextNode(job.location);
      jobProp3.appendChild(jobProp3Text);

      jobProps.append(jobProp1, jobProp2, jobProp3);
      jobInfo.append(position, jobProps);
      jobContent.append(jobInfo);
      jobCard.appendChild(jobContent);

      const jobLanguagesAndTools = document.createElement('ul');
      jobLanguagesAndTools.classList.add('job-languages-tools');

      const languagesItems = job.languages.map((language) => {
        const li = document.createElement('li');
        const text = document.createTextNode(language);
        li.appendChild(text);
        li.classList.add('language-tag');
        return li;
      });

      const toolsItems = job.tools.map((tool) => {
        const li = document.createElement('li');
        const text = document.createTextNode(tool);
        li.appendChild(text);
        li.classList.add('language-tag');
        return li;
      });

      jobLanguagesAndTools.append(...languagesItems, ...toolsItems);
      jobCard.append(jobLanguagesAndTools);

      mainElement.appendChild(jobCard);
      console.log(jobCard);
    });
  })
  .catch((error) => console.error(error.message));

//   slower performance but easier to the eyes :)
//    const jobCards = jobs
//       .map(
//         (job) => `
//     <article class="job-card">
//         <div class="job-img">
//           <img src="${job.logo}" alt="${job.company}" />
//         </div>
//         <div class="job-content">
//           <header>
//             <h3 class="company">${job.company}</h3>
//             <div class="job-tags">
//               <span class="commercial-tag commercial-tag--new ${
//                 job.new ? 'active' : ''
//               }">New!</span>
//               <span class="commercial-tag commercial-tag--featured ${
//                 job.featured ? 'active' : ''
//               }"
//                 >Featured</span
//               >
//             </div>
//           </header>
//           <div class="job-info">
//             <h2 class="position">${job.position}</h2>
//             <ul class="job-props">
//               <li class="job-prop">${job.postedAt}</li>
//               <li class="job-prop">${job.contract}</li>
//               <li class="job-prop">${job.location}</li>
//             </ul>
//           </div>
//         </div>
//         <ul class="job-languages-tools">
//         ${job.languages
//           .map((language) => `<li class="language-tag">${language}</li>`)
//           .join('')}
//           ${job.tools
//             .map((tool) => `<li class="language-tag">${tool}</li>`)
//             .join('')}
//         </ul>
//       </article>
//       `
//       )
//       .join('');

//     document.querySelector('main').innerHTML = jobCards;
