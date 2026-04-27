export async function fetchGitHubData(username) {
  const contentEl = document.getElementById('github-content');
  const errorEl = document.getElementById('github-error');

  if (!contentEl || !errorEl) return;

  contentEl.style.opacity = '0.3';
  errorEl.classList.add('displayHide');

  try {
    const [profileRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`),
      fetch(`https://api.github.com/users/${username}/events/public?per_page=100`)
    ]);

    if (profileRes.status === 403 || reposRes.status === 403) {
      throw new Error('RATE_LIMIT');
    }

    if (!profileRes.ok || !reposRes.ok) throw new Error('FAILED');

    const profileData = await profileRes.json();
    const reposData = await reposRes.json();
    const eventsData = await eventsRes.json();

    window.githubData = { profile: profileData, repos: reposData, events: eventsData };
    updateGitHubUI(profileData, reposData, eventsData);

    contentEl.classList.remove('displayHide');
    contentEl.style.opacity = '1';
  } catch (error) {
    console.error('GitHub Fetch Error:', error);
    errorEl.classList.remove('displayHide');
    if (error.message === 'RATE_LIMIT') {
      errorEl.innerHTML = '<p>GitHub API Rate Limit reached. <br> Please wait a few minutes and try again.</p>';
    } else {
      errorEl.innerHTML = '<p>Failed to load GitHub data. <br> Please check your connection.</p>';
    }
  }
}

function updateGitHubUI(profile, repos, events) {
  const avatar = document.getElementById('github-avatar');
  const name = document.getElementById('github-name');
  const bio = document.getElementById('github-bio');
  const reposCount = document.getElementById('github-repos-count');
  const followers = document.getElementById('github-followers');
  const totalStars = document.getElementById('github-total-stars');
  const totalForks = document.getElementById('github-total-forks');
  const profileLink = document.getElementById('github-profile-link');
  const reposList = document.getElementById('github-repos-list');
  const statsCard = document.getElementById('github-stats-card');
  const languagesCard = document.getElementById('github-languages-card');
  const graphNew = document.getElementById('github-graph-new');
  const reviewsCount = document.getElementById('github-reviews');
  const commitsCount = document.getElementById('github-commits-count');
  const issuesCount = document.getElementById('github-issues-count');
  const prsCount = document.getElementById('github-prs-count');
  const timeline = document.getElementById('github-recent-activity');

  if (avatar) avatar.src = profile.avatar_url;
  if (name) name.textContent = profile.name || profile.login;
  if (bio) bio.textContent = profile.bio || 'No bio available';
  if (reposCount) reposCount.textContent = profile.public_repos;
  if (followers) followers.textContent = profile.followers;
  
  if (repos) {
    const starsSum = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const forksSum = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
    if (totalStars) totalStars.textContent = starsSum;
    if (totalForks) totalForks.textContent = forksSum;
  }

  if (profileLink) profileLink.href = profile.html_url;

  if (graphNew) {
    graphNew.src = `https://ghchart.rshah.org/409ba5/${profile.login}`;
  }

  // Calculate Activity Stats from events
  if (events) {
    let commits = 0;
    let issues = 0;
    let prs = 0;
    let reviews = 0;

    events.forEach(event => {
      if (event.type === 'PushEvent') commits += event.payload.commits ? event.payload.commits.length : 1;
      if (event.type === 'IssuesEvent') issues++;
      if (event.type === 'PullRequestEvent') prs++;
      if (event.type === 'PullRequestReviewCommentEvent') reviews++;
    });

    if (commitsCount) commitsCount.textContent = commits;
    if (issuesCount) issuesCount.textContent = issues;
    if (prsCount) prsCount.textContent = prs;
    if (reviewsCount) reviewsCount.textContent = reviews;
  }

  if (statsCard) {
    statsCard.src = `https://github-readme-stats.vercel.app/api?username=${profile.login}&show_icons=true&theme=github_dark&hide_border=true&title_color=00c9ff&text_color=ffffff&icon_color=92fe9d&t=${Date.now()}`;
  }

  if (languagesCard) {
    languagesCard.src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.login}&layout=compact&theme=github_dark&hide_border=true&title_color=00c9ff&text_color=ffffff&t=${Date.now()}`;
  }

  if (timeline && events) {
    timeline.innerHTML = '';
    events.slice(0, 5).forEach(event => {
      let action = '';
      let target = event.repo.name.split('/')[1];

      switch (event.type) {
        case 'PushEvent': action = `Pushed commits to <span class="activity-action">${target}</span>`; break;
        case 'WatchEvent': action = `Starred <span class="activity-action">${target}</span>`; break;
        case 'CreateEvent': action = `Created <span class="activity-action">${target}</span>`; break;
        case 'PullRequestEvent': action = `${event.payload.action.charAt(0).toUpperCase() + event.payload.action.slice(1)} PR on <span class="activity-action">${target}</span>`; break;
        default: action = `Activity on <span class="activity-action">${target}</span>`;
      }

      const date = new Date(event.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

      const item = document.createElement('div');
      item.className = 'activity-item';
      item.innerHTML = `
        <span class="activity-date">${date}</span>
        <p style="margin:0">${action}</p>
      `;
      timeline.appendChild(item);
    });
  }

  if (reposList) {
    reposList.innerHTML = '';
    repos.forEach(repo => {
      const repoCard = document.createElement('div');
      repoCard.className = 'repo-card';
      repoCard.innerHTML = `
        <a href="${repo.html_url}" target="_blank" style="text-decoration: none; color: inherit;">
          <h4 style="margin: 0 0 5px 0; color: #92fe9d;">${repo.name}</h4>
          <p style="font-size: 13px; margin-bottom: 10px;">${repo.description || 'No description available'}</p>
          <div class="repo-meta" style="display: flex; gap: 15px; font-size: 12px; opacity: 0.6;">
            <span>⭐ ${repo.stargazers_count}</span>
            <span>🍴 ${repo.forks_count}</span>
            <span>${repo.language || 'Code'}</span>
          </div>
        </a>
      `;
      reposList.appendChild(repoCard);
    });
  }
}
