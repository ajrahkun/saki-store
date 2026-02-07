const loading = document.getElementById('loading');
const content = document.getElementById('content');

if (localStorage.getItem('cf_verified') === 'true') {
  const overlay = document.getElementById('cf-overlay');
  if (overlay) overlay.remove();
};

window.addEventListener('load', () => {
  setTimeout(() => {
    loading.style.opacity = '0';
    content.style.opacity = '1';
    setTimeout(() => {
      loading.style.display = 'none';
    }, 500);
  }, 600);
});

fetch('./database/komisi-data.json').then(response => response.json()).then(data => {
  const tbody = document.getElementById('income-body');
  let totalIncome = 0;
  tbody.innerHTML = '';

  data.sort((a, b) => a.name.localeCompare(b.name, 'id', { sensitivity: 'base' }));

  data.forEach((item, index) => {
    totalIncome += item.income;

    const nameCell = item.acc
      ? `<a href="${item.acc}" target="_blank" 
            class="transition-colors duration-200 text-white hover:text-gray-400">
            ${item.name}
          </a>`
      : item.name;

    const row = `
      <tr class='transition hover:bg-[#222222]'>
        <td class='border border-[rgba(255,255,255,0.1)] px-4 py-2 text-center'>${index + 1}</td>
        <td class='border border-[rgba(255,255,255,0.1)] px-4 py-2 text-center'>${nameCell}</td>
        <td class='border border-[rgba(255,255,255,0.1)] px-4 py-2 text-center'>Rp ${item.income.toLocaleString('id-ID')}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  const totalEl = document.getElementById('total-income');
  if (totalEl) {
    totalEl.textContent = 'Rp ' + totalIncome.toLocaleString('id-ID');
  }
}).catch(err => console.error(err));

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('cf-overlay');
  if (overlay) {
    document.body.style.overflow = 'hidden';
  };
  window.onVerified = () => {
    localStorage.setItem('cf_verified', 'true');

    const overlay = document.getElementById('cf-overlay');
    overlay.classList.add('hidden');
    setTimeout(() => {
        overlay.remove();
        document.body.style.overflow = 'auto';
    }, 600);
  };
});