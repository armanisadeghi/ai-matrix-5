// utils.ts



export const tableToData = (table: HTMLTableElement) => {
    const headers = Array.from(table.querySelectorAll('th')).map(th => th.innerText);
    const rows = Array.from(table.querySelectorAll('tbody tr')).map(tr =>
        Array.from(tr.querySelectorAll('td')).map(td => td.innerText)
    );

    return {
        headers,
        rows
    };
};

export const copyTableToClipboard = (table: HTMLTableElement) => {
    const {headers, rows} = tableToData(table);
    const text = [headers, ...rows].map(row => row.join('\t')).join('\n');
    navigator.clipboard.writeText(text).then(() => {
        console.log('Table copied to clipboard!');
    }, (err) => {
        console.error('Could not copy table to clipboard', err);
    });
};

export const exportToCSV = ({headers, rows}: { headers: string[], rows: string[][] }) => {
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    a.href = url;
    a.download = `matrix-data-${randomSuffix}.csv`;
    a.click();
    URL.revokeObjectURL(url);
};


// TODO: Add Excel exports, which should be really easy if you save a template and just have the formatting only applied to the columns and rows with data.
// TODO: Add Google Sheets export: Might be a bit more complex, but maybe a template would work. (Or have the backend do it?)
