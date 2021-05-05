//Credits goes to Seb and Kaimi (Chronoskia Server)
window.leaderboardMods = {
    "EZ": false,
    "NF": false,
    "HT": false,
    "HR": false,
    "SD": false,
    "PF": false,
    "DT": false,
    "NC": false,
    "HD": false,
    "FL": false,
    "SO": false,
    "RX": false,
    "TD": false
};

function inject() {
    document.head.innerHTML += `
        <style>
            .mod-button, #resetButton {
                width: 5rem;
                height: 5rem;
                background-color: inherit;
                color: #FFF;
                border: 1px solid rgba(255,255,255,.13);
                margin: 3px;
                box-shadow: 0px 4px 0 #000;
                font-weight: bold;
            }

            .buttonActive, #resetButton:active {
                box-shadow: none;
                position: relative;
                top: 4px;
                border: 1px solid rgba(255, 255, 255, 0.5);
            }

            .mod-button:hover {
                background-color: rgba(255,255,255,.1);
            }

            #leaderboardArrows:hover {
                background-color: #212121 !important; 
                cursor: default !important;
                color: #000 !important;
            }

            #arrowLeft:active, #arrowRight:active {
                position: relative;
                top: 3px;
            }

            .emptyPageAnimation {
                animation: shake 0.5s normal forwards ease-in-out;
            }

            .tdimg {
                width: 1.5rem;
                height: 1.5rem;
            }

            .leaderDisabled {
                pointer-events: none !important;
                opacity: 0.5;
            }
        </style>
    `;

    // Arrow buttons
    document.querySelector("table.ui > thead:nth-child(1)").innerHTML = `		
        <tr>
            <th colspan="9" id="leaderboardArrows">
                <div class="simplepag">
                    <div class="ui left floated pagination menu">
                        <a class="icon item" id="arrowLeft">
                            <i class="left chevron icon"></i>
                        </a>
                    </div>
                    <div class="ui right floated pagination menu">
                        <a class="icon item" id="arrowRight">
                            <i class="right chevron icon"></i>
                        </a>
                    </div>
                </div>
            </th>
        </tr>

        ${document.querySelector("table.ui > thead:nth-child(1)").innerHTML}
    `;

    // Changes the table a little
    document.querySelector("table.ui > thead:nth-child(1) > tr:nth-child(2)").innerHTML = `
        <tr>
            <th class="one wide">Rank</th>
            <th class="two wide">Grade</th>
            <th class="four wide">Player</th>
            <th class="three wide">Score</th>
            <th class="two wide">Mods</th>
            <th class="two wide">Accuracy</th>
            <th class="two wide">Combo</th>
            <th class="two wide">PP</th>
            <th class="two wide">Date</th>
        </tr>
    `;

    // RX buttons for troke
    document.querySelector(".segments").outerHTML += `
        <div class="ui three item menu">
			<a class="item" id="vbutton">Vanilla</a>
			<a class="item" id="rbutton">Relax</a>
	    </div>
    `;

    // Game mod sorting
    document.querySelector(".segments").outerHTML += `
        <div class="ui four item menu" style="display: flex; padding: 1em;">
            <button class="mod-button" id="EZ">EZ</button>
            <button class="mod-button" id="NF">NF</button>
            <button class="mod-button" id="HT">HT</button>
            <button class="mod-button" id="HR">HR</button>
            <button class="mod-button" id="SD">SD</button>
            <button class="mod-button" id="PF">PF</button>
            <button class="mod-button" id="DT">DT</button>
            <button class="mod-button" id="NC">NC</button>
            <button class="mod-button" id="HD">HD</button>
            <button class="mod-button" id="FL">FL</button>
            <button class="mod-button" id="SO">SO</button>
            <button class="mod-button" id="TD">TD</button>
            <button id="resetButton">Reset</button>
        </div>
    `;
};

function mirrorButtons() {
    // Creates alternative download links.
    // Random colors are: ["red", "orange", "olive", "yellow", "green", "teal", "blue", "violet", "purple", "pink", "brown", "grey"];
    
    const colors = ["red", "orange", "olive", "yellow", "teal", "blue", "violet", "brown"];
    const sources = [
        { name: "Beatconnect", mirror: "https://beatconnect.io/b/" },
        { name: "Chimu", mirror: "https://chimu.moe/en/d/" },
        { name: "Sayobot", mirror: "https://txy1.sayobot.cn/beatmaps/download/full/" }
    ];

    // Chronoskia does not have a play button.
    window.prevAudio = new Audio(`https://b.ppy.sh/preview/${setData.SetID}.mp3`);
    window.prevAudioPlaying = false;

    window.togglePlay = () => {
        const ico = document.querySelector("#imageplay");
        window.prevAudioPlaying = !window.prevAudioPlaying;

        if (!window.prevAudioPlaying) {
            ico.classList.add("play");
            ico.classList.remove("pause");

            window.prevAudio.pause();
            window.prevAudio.currentTime = 0;
        } else {
            ico.classList.remove("play");
            ico.classList.add("pause");

            window.prevAudio.play();
        };
    };

    document.querySelector(".vertical").innerHTML += `
        <a class="ui purple labeled icon button" id="playButton" onclick="togglePlay()">
            <i class="play icon" id="imageplay"></i>
            <span id="PlayState">Play</span>
        </a>
    `;

    document.querySelector(".vertical").innerHTML += "<h3>Alternative Downloads:</h3>";
    for (const source of sources) {
        document.querySelector(".vertical").innerHTML += `
            <a href="${source.mirror+String(setData.SetID)}" class="ui ${colors[Math.floor(Math.random()*colors.length)]} labeled icon button">
                <i class="download icon" id="imageplay"></i>
                Download (${source.name})
            </a>
        `;
    };
};

function updateInformation(mapset) {
    const mode = ["Standard", "Taiko", "Catch the Beat", "Mania"];
    const diff = mapset[beatmapID];
    
    // Column 2
    $("#cs").html(diff.CS);
    $("#hp").html(diff.HP);
    $("#od").html(diff.OD);
    $("#passcount").html(addCommas(diff.Passcount));
    $("#playcount").html(addCommas(diff.Playcount));

    // Column 3
    $("#ar").html(diff.AR);
    $("#stars").html(diff.DifficultyRating.toFixed(2));
    $("#length").html(timeFormat(diff.TotalLength));
    $("#drainLength").html(timeFormat(diff.HitLength));
    $("#bpm").html(diff.BPM);

    document.querySelector("div.four:nth-child(1) > div:nth-child(1) > div:nth-child(1)").innerHTML += `
        <p>Mode: ${mode[mapset[beatmapID]["Mode"]]}</p>
        <p>FileMD5 (click to copy): <span style="overflow: hidden" onclick="alert('${mapset[beatmapID]["FileMD5"]}')">${mapset[beatmapID]["FileMD5"].substr(0, 5)}...</span></p>
        <p>Bancho Link: <a href="https://osu.ppy.sh/b/${beatmapID}" target="_blank">${beatmapID}</a></p>
        <p>Direct File Links:</p>
        <textarea style="background-color: inherit" readonly>${Object.keys(mapset).map(v => "https://osu.ppy.sh/osu/"+v).join("\n\n")}</textarea>
    `;
};

async function longerLeaderboard(mapset) {
    let page = 1;

    function filterScores(scores) {
        return scores ? scores.filter((score) => {
            const mods = getScoreMods(score.mods, true).split(", ");

            for (let i = 0; i < Object.keys(window.leaderboardMods).length; i++) {
                const curMod = Object.keys(window.leaderboardMods)[i];

                if (window.leaderboardMods[Object.keys(window.leaderboardMods)[i]]) {
                    if (!mods.includes(curMod)) {
                        return false;
                    };
                };
            };
            
            if (!window.leaderboardMods["RX"]) {
                if (mods.includes("RX")) {
                    return false;
                };
            };

            return true;
        }) : [];
    };

    async function grabAllScores(options) {
        const scores = [];
        let i = 1;

        async function grabber(i) {
            for (let elm of document.querySelectorAll(".item")) {
                elm.classList.add("leaderDisabled");
            };
    
            const res = await fetch(
                `https://osu.troke.id/api/v1/scores?sort=score,desc&sort=id,asc&mode=${options.mode}&b=${options.b}&p=${i}&l=50&rx=0`
            ).then(o => o.json());
    
            if (res.scores) {
                scores.push(...res.scores);
                await grabber(++i);
            } else { return; };
        };
    
        await grabber(i);

        for (let elm of document.querySelectorAll(".item")) {
            elm.classList.remove("leaderDisabled");
        };

        return scores;
    };
    

    async function parseAndFilter(options) {        
        let allScores = filterScores(await grabAllScores(options));

        return allScores.slice((options.p-1)*50, 50+((options.p-1)*50));
    };

    async function loadBoard(page) {
        const options = {
            mode: (window.gameMode || 0),
            b: beatmapID,
            p: page,
            l : 50,
            rx: (window.rx || 0)
        };

        console.log(`loading leaderboard with relax=${options.rx} and mode=${options.mode}`);
        const allScores = await parseAndFilter(options);

        (scores => {
            if (scores == null) {
                scores = [];
            };

            const tb = $(".ui.table tbody");
            let i = 0;
            
            tb.find("tr").remove();

            scores.forEach(score => {
                const user = score.user;
                const setDate = new Date(score.time);
                const formatted = `${setDate.getFullYear()}/${setDate.getMonth()}/${setDate.getDay()}`;
                let grade;

                // Why
                switch (score.rank) {
                    case "SSH":
                        grade = "SSHD";
                        break;
                    case "SH":
                        grade = "SHD";
                        break;
                    default:
                        grade = score.rank;
                };
                
                // jQuery taken from the source
                tb.append($("<tr />").append(
                    $("<td data-sort-value="+(++i)+" />").text("#"+((page-1)*50+i)),
                    $("<td class='tdcenter' data-sort-value="+grade+" />").html(`<img src="https://cdn.troke.id/static/ranking-icons/${grade}.png" class="tdimg" />`),
                    $("<td />").html("<a href='/u/"+user.id+"' title='View profile'><i class='"+user.country.toLowerCase()+" flag'></i>"+escapeHTML(user.username)+"</a>"),
                    $("<td data-sort-value="+score.score+" />").html(addCommas(score.score)),
                    $("<td />").html(getScoreMods(score.mods, true)),
                    $("<td data-sort-value="+score.accuracy+" />").text(score.accuracy.toFixed(2)+"%"),
                    $("<td data-sort-value="+score.max_combo+" />").text(addCommas(score.max_combo)),
                    $("<td data-sort-value="+score.pp+" />").html(score.pp.toFixed(2)),
                    $("<td title="+(score.time)+" data-sort-value="+formatted+" />").html(formatted)
                ));
            });
        })(allScores);
    };

    function fixButtonsTop() {
        const elms = ["#vbutton", "#rbutton"];

        function updateBoard(rx) {
            window.rx = parseInt(rx);

            let playMode = [false, "RX"][rx];

            window.leaderboardMods["RX"] = false;
            if (playMode) window.leaderboardMods[playMode] = !window.leaderboardMods[playMode];
            page = 1;

            loadBoard(1);
        };

        for (let i in elms) {
            document.querySelector(elms[i]).onclick = () => {
                for (let j of elms) {
                    document.querySelector(j).classList.remove("active");
                };

                document.querySelector(elms[i]).classList.add("active");
                updateBoard(i);
            };
        };

        document.querySelector(elms[0]).classList.add("active");
    };

    function fixButtonsBottom() {
        function updateMode(gameMode) {
            window.gameMode = gameMode;
            page = 1;
        
            loadBoard(1);
        };
        
        for (let i = 0; i <= 3; i++) {
            document.querySelector(`#mode-${i}`).removeAttribute("href");
            
            document.querySelector(`#mode-${i}`).onclick = () => {
                for (let j = 0; j <= 3; j++) {
                    document.querySelector(`#mode-${j}`).classList.remove("active");
                };

                document.querySelector(`#mode-${i}`).classList.add("active");
                updateMode(i);
            };
        };
    };

    async function checkPage(page) {
        const options = {
            mode: (window.gameMode || 0),
            b: beatmapID,
            p: page,
            l : 50,
            rx: (window.rx || 0)
        };

        const scores = await parseAndFilter(options);
        return !(scores.length == 0 || page <= 0);
    };

    
    async function arrowButtons() {
        const right = "div.right";
        const left = "div.left";

        const triggerAnimation = elm => {
            elm.classList.add("emptyPageAnimation");
            setTimeout(() => elm.classList.remove("emptyPageAnimation"), 600);
        };

        document.querySelector(right).addEventListener("click", async function() {
            if (await checkPage(page+1)) {
                loadBoard(++page);
            } else {
                triggerAnimation(this);
            };
        });
        
        document.querySelector(left).addEventListener("click", async function() {
            if (await checkPage(page-1)) {
                loadBoard(--page);
            } else {
                triggerAnimation(this);
            };
        });
    };

    function gameMods() {
        for (let elm of document.querySelectorAll(".mod-button")) {
            elm.addEventListener("click", function() {
                window.leaderboardMods[this.innerText] = !window.leaderboardMods[this.innerText];
                
                if (window.leaderboardMods[this.innerText]) {
                    this.classList.add("buttonActive");
                } else {
                    this.classList.remove("buttonActive");
                };

                page = 1;
                loadBoard(1);
            });
        };

        document.querySelector("#resetButton").onclick = () => {
            for (let i = 0; i < Object.keys(window.leaderboardMods).length; i++) {
                window.leaderboardMods[Object.keys(window.leaderboardMods)[i]] = false;
                try {
                    document.querySelector(`#${Object.keys(window.leaderboardMods)[i]}`).classList.remove("buttonActive");   
                } catch(e) {};
            };

            page = 1;
            loadBoard(1);
        };
    };


    await arrowButtons();
    fixButtonsTop();
    fixButtonsBottom();
    gameMods();

    window.gameMode = mapset[beatmapID]["Mode"];
    document.querySelector(`#mode-${window.gameMode}`).classList.add("active");
    loadBoard(1);
};

async function init() {
    const mapset = {};
    setData.ChildrenBeatmaps.forEach(diff => {
        mapset[diff.BeatmapID] = diff;
    });

/////////////////////////
    inject();
/////////////////////////

    mirrorButtons();
    updateInformation(mapset);
    await longerLeaderboard(mapset);
};

window.onload = init;
