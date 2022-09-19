

// variables

let colors = [
  '#D00',
  '#DD0',
  '#0DD',
  '#22D',
  '#D0D'
];

let scores = [  //listoflists
  ['TAB','1991-03-03','12345'],
  ['BAT','1991-02-02','5000'],
  ['JEM','1991-01-01','1000'],
  ['TOB','1991-01-03','1555'],
  ['BEE','1991-03-02','7000'],
  ['OOP','1991-02-01','1250'],
];

let topscore = 13000;





//submit button

document.querySelector('#addscore a').addEventListener('click', () => {
  let entry = [
    document.getElementById('name').value,
    document.getElementById('date').value,
    document.getElementById('score').value
  ];

  document.querySelector('#addscore .alert').innerHTML = '';

  if (entry[0] == '') {
    document.querySelector('#addscore .alert').innerHTML = 'RE-ENTER NAME!';
  }
  else if (entry[1].search(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) == -1) {
    document.querySelector('#addscore .alert').innerHTML = 'RE-ENTER DATE!';
  }
  else if (entry[2].search(/^[0-9]*$/) < 0 || entry[2] == '') {
    document.querySelector('#addscore .alert').innerHTML = 'RE-ENTER SCORE!';
  }
  else {
    fetch('/scores', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(entry)
    })
    .then(response => response.json())
    .then(data => {
      insertEntry(entry)
    });
  }
});

function insertEntry(entry/*arguments go here*/) {
  scores.push(entry);

  document.getElementById('highscores').innerHTML = '<tr><th>[NAME]</th><th>[DATE]</th><th>[SCORE]</th></tr>';
  document.getElementById('chart').innerHTML = '';     //retrieve html in highscores section and replace it.

    for (let i=0; i < scores.length; i++) {
      let color = colors[i%colors.length]; //whole list of colours and will never run out.
      let bar = document.createElement('div'); //creating a thing called bar
      bar.className = 'bar';
      bar.style.width = scores[i][2] / topscore * 100 + '%'; //takes the score in bar and compares to top score to determine % of how wide it is.
      bar.style.backgroundColor = color;
      document.getElementById('chart').appendChild(bar);

      let row = document.createElement('tr');
      row.style.color = color;
      row.innerHTML += '<td>' + scores[i][0] + '</td>';
      row.innerHTML += '<td>' + scores[i][1] + '</td>';
      row.innerHTML += '<td>' + scores[i][2] + '</td>';
      document.getElementById('highscores').appendChild(row);
    }
}

// load scores

fetch('/scores', { method: 'GET' })
  .then(response => response.json())
  .then(data => {
    for (let i=0; i<data.length; i++) {
      insertEntry([
        data[i][1],
        data[i][2],
        data[i][3]
      ]);
    }
  });

/*



let bar = document.createElement('div');
bar.className = 'bar';
bar.style.width = '95%';
bar.style.backgroundColor = '#D00';
document.getElementById('chart').appendChild(bar);

let row = document.createElement('tr');
row.style.color = '#D00';
row.innerHTML += '<td>TAB</td>';
row.innerHTML += '<td>1991-03-03</td>';
row.innerHTML += '<td>12345</td>';
document.getElementById('highscores').appendChild(row); */
