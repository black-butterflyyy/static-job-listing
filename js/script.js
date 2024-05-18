'use strict';

const mainElement = document.querySelector('main');
const filterBox = document.querySelector('.filter-box');
const filterList = document.querySelector('.filters-list');
const clearButton = document.querySelector('.clear-button');
const searches = [];

fetch('../data.json')
  .then((data) => data.json())
  .then((jobs) => {
    const createFilterListDom = () => {
      searches.forEach((term) => {
        const li = document.createElement('li');
        li.classList.add('filter-tag');
        const span = document.createElement('span');
        const text = document.createTextNode(term);
        span.appendChild(text);
        li.appendChild(span);

        const img = document.createElement('img');
        img.setAttribute('src', './images/icon-remove.svg');
        img.classList.add('remove-item');
        li.appendChild(img);
        filterList.appendChild(li);

        img.addEventListener('click', removeItem);
      });
    };

    const removeItem = (e) => {
      const searchTerm = e.target.previousSibling.innerText;
      const indexOfTarget = searches.indexOf(searchTerm);
      if (indexOfTarget !== -1) {
        searches.splice(indexOfTarget, 1);

        if (!searches.length) {
          filterBox.style.display = 'none';
          mainElement.innerHTML = '';
          createDom(jobs);
          return;
        }

        filterJobs();
      }
    };

    const filterJobs = () => {
      const filteredJobs = jobs.filter((job) =>
        searches.some(
          (term) => job.languages.includes(term) || job.tools.includes(term)
        )
      );

      // Reset dom
      mainElement.innerHTML = '';
      filterBox.style.display = 'flex';
      filterList.innerHTML = '';

      // create dom with new data
      createFilterListDom();
      createDom(filteredJobs);
    };

    const handleClickFilter = (e) => {
      if (e.target.tagName === 'LI') {
        const search = e.target.innerText;
        if (!searches.includes(search)) searches.push(search);
        filterJobs(jobs);
      }
    };

    const createDom = (jobs) => {
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
        featuredTag.classList = `commercial-tag commercial-tag--featured ${
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

        // Add event click for filtering by lang and tool
        jobLanguagesAndTools.addEventListener('click', handleClickFilter);
      });
    };

    createDom(jobs);

    const handleClearAllFilters = (e) => {
      searches.length = 0;
      filterBox.style.display = 'none';
      mainElement.innerHTML = '';
      createDom(jobs);
    };

    clearButton.addEventListener('click', handleClearAllFilters);
  })
  .catch((error) => console.error(error.message));
