// load random trope from a .txt file
// client side

export default function randomTrope(name) {
    let return_data = '';
    // check if in local storage
    if (localStorage.getItem(name)) {
        return localStorage.getItem(name);
    }
    $.ajax({
        url: 'src/lib/tropes/' + name + '.txt',
        type: 'GET',
        success: function(data) {
            var lines = data.split('\n');
            var randomLine = lines[Math.floor(Math.random() * lines.length)];
            return_data = randomLine;
        },
        async: false
    });
    localStorage.setItem(name, return_data);
    return return_data;
}