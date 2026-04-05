import fs from 'fs';

const careers = JSON.parse(fs.readFileSync('d:/KRM/26/EurekaAutomation_site/src/data/careers.json', 'utf8'));

const headers = [
    'id', 'status', 'urgent',
    'dept_th', 'dept_en',
    'title_th', 'title_en',
    'location_th', 'location_en',
    'type_th', 'type_en',
    'experience_th', 'experience_en',
    'education_th', 'education_en',
    'salary_th', 'salary_en',
    'slots',
    'desc_th', 'desc_en',
    'qualification_th', 'qualification_en'
];

const rows = [];
rows.push(headers.join('\t')); // Tab separated is easier for copy-pasting to Sheets

const allSections = Object.keys(careers).filter(key => Array.isArray(careers[key]));
let globalId = 1;

allSections.forEach(section => {
    careers[section].forEach((pos) => {
        // Extract numeric part of slots or use the raw Thai value as base
        let slotsValue = pos.slots?.th || '';
        slotsValue = slotsValue.replace('ตำแหน่ง', '').trim();

        const row = [
            globalId++, // Numeric ID
            pos.active ? 'TRUE' : 'FALSE', // Boolean status
            pos.urgent ? 'TRUE' : 'FALSE',
            pos.dept?.th || '', pos.dept?.en || '',
            pos.title?.th || '', pos.title?.en || '',
            pos.location?.th || '', pos.location?.en || '',
            pos.type?.th || '', pos.type?.en || '',
            pos.experience?.th || '', pos.experience?.en || '',
            pos.education?.th || '', pos.education?.en || '',
            pos.salary?.th || '', pos.salary?.en || '',
            slotsValue,
            (Array.isArray(pos.desc?.th) ? pos.desc.th.join('\n') : (pos.desc?.th || '')).replace(/"/g, '""'),
            (Array.isArray(pos.desc?.en) ? pos.desc.en.join('\n') : (pos.desc?.en || '')).replace(/"/g, '""'),
            (Array.isArray(pos.qualification?.th) ? pos.qualification.th.join('\n') : (pos.qualification?.th || '')).replace(/"/g, '""'),
            (Array.isArray(pos.qualification?.en) ? pos.qualification.en.join('\n') : (pos.qualification?.en || '')).replace(/"/g, '""')
        ];
        rows.push(row.map(cell => `"${cell}"`).join('\t'));
    });
});

fs.writeFileSync('d:/KRM/26/EurekaAutomation_site/careers_for_import.tsv', rows.join('\n'), 'utf8');
console.log('Conversion complete: careers_for_import.tsv created.');
