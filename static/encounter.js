const reSpace = /\s+/g;
const reRepeat = /(\d+)\s*x\s*(\d+)/gi;
const rePunctuation = /(\:|\;|\,)\s*/g;
const monstersInPages = new WeakMap();
const dataUrl = "/data";

function parse(btn, index) {
    const parent = btn.parentElement;
    const textArea = parent.querySelector("textarea");
    var text = textArea.value;
    text = text.replace(reSpace, " ");

    reRepeat.lastIndex = 0;
    text = traverseRepeats(reRepeat.exec(text), text);

    text = text.replace(rePunctuation, "$1 ");
    let monster = getMonster(text);
    if (monster) {
        text = fixSections(monster);

        textArea.value = text;


        const page = btn.parentElement.parentElement.parentElement.parentElement.parentElement;
        const monstersInBlocks = monstersInPages.get(page) || [
            [],
            [],
            []
        ];
        monsterInCombatTracker(page, monster, monstersInBlocks, index);
        monstersInPages.set(page, monstersInBlocks);
    }
}

const traverseRepeats = (result, str) => {
    if (!result) return str;
    let nextResult = reRepeat.exec(str);
    str = traverseRepeats(nextResult, str);
    let match = result[0];
    let times = parseInt(result[2]);
    let value = parseInt(result[1]);
    let replacementArray = [];
    for (let i = 0; i < times; i++)
        replacementArray[i] = value;
    let replacement = replacementArray.join(", ");
    let strArray = Array.from(str);
    strArray.splice(result.index, match.length, replacement);
    str = strArray.join("");
    return str;
}

const sectionNames = [
    "AC",
    "MV",
    "HD",
    "hp",
    "#AT",
    "Dmg",
    "SA",
    "SD",
    "AL",
    "XP",
    "THACO"
];

const sectionRegex = sectionNames.map(key => new RegExp("^" + key, "i"));

const getMonster = str => {
    let nameEnd = str.indexOf(":");
    let namePart = str.substring(0, nameEnd);
    let nameMatch = namePart.match(/(?:(.+?)\s*\((\d+)\)|(.+))/);
    if (nameMatch) {
        let name = nameMatch[1] || nameMatch[3];
        let count = parseInt(nameMatch[2]) || 1;
        let otherParts = str.substr(nameEnd + 1).trim().split(";").map(p => p.trim());
        let monster = { name, count };
        otherParts.forEach(part => {
            let sectionIndex = sectionRegex.findIndex(sre => sre.test(part));
            if (sectionIndex >= 0) {
                let section = sectionNames[sectionIndex];
                monster[section] = part.substring(section.length).trim();
            }
        });
        return monster;
    } else {
        return null;
    }
};

const fixSections = monster => {
    if (typeof monster === "string")
        monster = getMonster(monster);
    let otherPartArr = [];
    sectionNames.forEach(sec => {
        if (monster[sec]) {
            otherPartArr.push(`${sec} ${monster[sec]}`);
        }
    });
    let count = monster.count;
    let countStr = "";
    if (count > 1)
        countStr = ` (${count})`;
    let value = `${monster.name}${countStr}: ${otherPartArr.join("; ")}`;
    return value;
};

const monsterInCombatTracker = (page, monster, monstersInBlocks, index) => {
    let list = [];
    monstersInBlocks.splice(index, 1, list);
    for (let i = 0; i < monster.count; i++) {
        list.push(`${monster.name} ${i + 1}`);
    }

    let nameCells = page.querySelectorAll("div.initTableRow>div.initTableCol1");
    let flatBlocks = flattenBlocks(monstersInBlocks);
    nameCells.forEach((cell, i) => {
        let text = flatBlocks[i] || "";
        cell.innerText = text;
    })

}

const flattenBlocks = monstersInBlocks => {
    let result = [];
    for (let i = 0; i < monstersInBlocks.length; i++) {
        let currentBlock = monstersInBlocks[i];
        result = result.concat(currentBlock);
    }
    return result;
}

const load = async() => {
    let response = await fetch(dataUrl);
    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let data = await response.json();
        let pages = document.querySelectorAll(".page");
        let pageCountDiff = data.length - pages.length;
        for (let i = 0; i < pageCountDiff; i++) {
            add();
        }
        for (let i = pageCountDiff; i < 0; i++) {
            remove();
        }
        pages = document.querySelectorAll(".page");
        pages.forEach((page, pageIndex) => {
            let encounterData = data[pageIndex];
            page.querySelector(".title").value = encounterData.name;
            let monsterBlocks = page.querySelectorAll(".monsterBox>textarea");
            monsterBlocks.forEach((ta, mbIndex) => ta.value = encounterData.monsterBlocks[mbIndex] || "");
            let parseButtons = page.querySelectorAll(".monsterBox>button");
            parseButtons.forEach((btn, btnIndex) => parse(btn, btnIndex));
        });
    } else {
        alert("HTTP-Error: " + response.status);
    }
};

const save = async() => {
    let data = [];
    let pages = document.querySelectorAll(".page");
    pages.forEach((page, pageIndex) => {
        let encounterData = { name: "", monsterBlocks: [] };
        encounterData.name = page.querySelector(".title").value;
        let monsterBlocks = page.querySelectorAll(".monsterBox>textarea");
        monsterBlocks.forEach((ta, mbIndex) => encounterData.monsterBlocks[mbIndex] = ta.value || "");
        data.push(encounterData);
    });

    let response = await fetch(dataUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
};

const add = () => {
    let pageElement = createNewPageElement();
    document.body.appendChild(pageElement);
}

const remove = () => {
    let pages = document.body.querySelectorAll("div.page");
    if (pages.length === 0)
        return;
    let lastPage = pages[pages.length - 1];
    lastPage.remove();
}