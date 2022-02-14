function verifyChallengeCompletion(record, challenge) {
	console.log(record);
	if (challenge === 0 && record.doneJigsaw) {
		window.location.href = "make_sets.html";
	} else if (challenge === 1 && record.doneMakeSets) {
		window.location.href = "wordle.html";
	} else if (challenge === 2 && record.doneWordle) {
		window.location.href = "complete.html";
	} else {
		alert("you sneaky beaky, can't skip the challenges :D")
	}
}

function checkGist(gistId, filename, challenge) {
	$.ajax({
		url: 'https://api.github.com/gists/' + gistId,
		type: 'GET',
		dataType: 'jsonp',
		success: function(data) {
			let content = data.data.files[filename].content;
			let record = JSON.parse(content);
			verifyChallengeCompletion(record, challenge);
		}, 
		error: function(e) {
			console.log(e);
		}
	});
}

function doneChallenge(challenge) {
	console.log("checking completion of challenge " + challenge);
	checkGist("69a81e930cd63cdfc19ef3e2ec53d81b", "wymbv2022_challenges", challenge);
}

function showPrize() {
	console.log("show prize picture");
	let prizeDisplay = document.getElementById("prize-display");
	window.location.href = "prize.html";
}

$(document).ready(function() {
	// vars used for typewriting animation
	let toTypeWriteElements;
	let toTypeWriteTexts;
	let ttwi;
	let i = 0;

	function showAfterTextsElements() {
		let toShow = document.querySelectorAll("#after-texts");
		for (let e of toShow) {
			e.style.display = "block";
		}
	}


	function recur() {
		if (ttwi < toTypeWriteElements.length) {
			let element = toTypeWriteElements[ttwi];
			let text = toTypeWriteTexts[ttwi];
			if (i < text.length) {
				let substr = element.textContent.substring(0, i);
				element.textContent = substr + text.charAt(i) + "|";
				i++;
			} else {
				element.textContent = text;
				i = 0;
				ttwi++;
			}
			setTimeout(recur, 20);
		} else {
			setTimeout(showAfterTextsElements, 500);
		}
	}

	// hide elements that show up after the typewriting texts
	let toHide = document.querySelectorAll("#after-texts");
	for (let e of toHide) {
		e.style.display = "none";
	}

	// populate arrays of elements to typewrite
	toTypeWriteElements = document.querySelectorAll("p, h1");
	toTypeWriteTexts = [];
	for (let e of toTypeWriteElements) {
		toTypeWriteTexts.push(e.textContent);
		e.textContent = "";
	}
	ttwi = 0;
	recur();

});

