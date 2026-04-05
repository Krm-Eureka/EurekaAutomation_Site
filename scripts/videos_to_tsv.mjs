import fs from 'fs';

// อ่านข้อมูลจาก videos.json
const videosData = JSON.parse(fs.readFileSync('d:/KRM/26/EurekaAutomation_site/src/data/videos.json', 'utf8'));

const headers = [
    'id', 'active', 'youtubeUrl',
    'category_th', 'category_en',
    'title_th', 'title_en',
    'desc_th', 'desc_en'
];

const rows = [];
rows.push(headers.join('\t'));

let globalIdCount = 1;

// วนลูปตามหมวดหมู่ (robotics, machines, logistics)
Object.keys(videosData).forEach(categoryKey => {
    const items = videosData[categoryKey];
    
    items.forEach((item) => {
        // สร้าง ID เช่น v001, v002...
        const id = `v${String(globalIdCount++).padStart(3, '0')}`;
        
        // รวมคำอธิบายจาก Array เป็น String ที่คั่นด้วยบรรทัดใหม่ (\n)
        const descTh = (item.description || []).map(d => d.th || '').filter(Boolean).join('\n');
        const descEn = (item.description || []).map(d => d.en || '').filter(Boolean).join('\n');

        const row = [
            id,
            'TRUE',
            item.youtubeUrl || '',
            item.category?.th || '',
            item.category?.en || '',
            item.title?.th || '',
            item.title?.en || '',
            descTh.replace(/"/g, '""'),
            descEn.replace(/"/g, '""')
        ];
        
        // ใส่ฟันหนูเพื่อป้องกันปัญหาอักขระพิเศษ
        rows.push(row.map(cell => `"${cell}"`).join('\t'));
    });
});

fs.writeFileSync('d:/KRM/26/EurekaAutomation_site/videos_for_import.tsv', rows.join('\n'), 'utf8');
console.log('Conversion complete: videos_for_import.tsv created.');
