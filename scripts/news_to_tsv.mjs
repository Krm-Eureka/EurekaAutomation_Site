import fs from 'fs';

const newsData = JSON.parse(fs.readFileSync('d:/KRM/26/EurekaAutomation_site/src/data/news.json', 'utf8'));

const headers = [
    'id', 'active', 'postedDate',
    'title_th', 'title_en',
    'date_th', 'date_en',
    'desc_th', 'desc_en',
    'images',
    'content_th', 'content_en'
];

const rows = [];
rows.push(headers.join('\t'));

Object.keys(newsData).forEach(id => {
    const item = newsData[id];

    const row = [
        id,
        'TRUE',
        item.postedDate || '',
        item.title?.th || '', item.title?.en || '',
        item.date?.th || '', item.date?.en || '',
        (item.desc?.th || '').replace(/"/g, '""'),
        (item.desc?.en || '').replace(/"/g, '""'),
        (item.images || []).join(','),
        (Array.isArray(item.content?.th) ? item.content.th.join('\n') : (item.content?.th || '')).replace(/"/g, '""'),
        (Array.isArray(item.content?.en) ? item.content.en.join('\n') : (item.content?.en || '')).replace(/"/g, '""')
    ];
    rows.push(row.map(cell => `"${cell}"`).join('\t'));
});

fs.writeFileSync('d:/KRM/26/EurekaAutomation_site/news_for_import.tsv', rows.join('\n'), 'utf8');
console.log('Conversion complete: news_for_import.tsv created.');
