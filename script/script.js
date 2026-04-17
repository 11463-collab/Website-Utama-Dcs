    const slider = document.querySelector('.showcase-grid');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Kecepatan geser
        slider.scrollLeft = scrollLeft - walk;
    });

const SUPABASE_URL = "https://bzlewbetssmjrsmfbcmy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6bGV3YmV0c3NtanJzbWZiY215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNDA2MjgsImV4cCI6MjA5MTkxNjYyOH0.qO2AHNwe9Rlh1DImyJJZLzxXoHPSTRKmQZYwWqz1rjQ";
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Bagian ini saya perbaiki/komentar karena sebelumnya terpotong
// const recruitmentSection = document.getElementById('e-recru');
// const dibuka = document.getElementById; // <-- Hapus atau lengkapi baris ini

async function loadRecruitmentData() {
    // Tambahkan .single() di akhir agar data yang dikembalikan langsung berupa object
    const { data: recruitmentData, error } = await _supabase
        .from('status')
        .select('*')
        .eq('id', 1)
        .single(); 

    if (error) {
        console.error('Error fetching recruitment data:', error);
        return;
    }

    // Karena sudah pakai .single(), recruitmentData.sts sekarang bisa terbaca
    if (recruitmentData && recruitmentData.sts === true) {
        document.getElementById('open-recruitment').style.display = 'block';
        document.getElementById('closed-recruitment').style.display = 'none';
    } else {
        document.getElementById('open-recruitment').style.display = 'none';
        document.getElementById('closed-recruitment').style.display = 'block';
    }
}

loadRecruitmentData();
