const pageTemplate = `<div class="page">
<div class="content">
    <div class="content-left">
        <input type="text" class="title" value="Encounter Name"></input>
        <div class="monsterBoxParent">
            <div class="monsterBox monsterBox1">
                <button onclick="parse(this, 0)">Parse</button>
                <textarea></textarea>
            </div>
            <div class="monsterBox monsterBox2">
                <button onclick="parse(this, 1)">Parse</button>
                <textarea></textarea>
            </div>
            <div class="monsterBox monsterBox3">
                <button onclick="parse(this, 2)">Parse</button>
                <textarea></textarea>
            </div>
        </div>
    </div>
    <div class="content-right">
        <div class="roundRow">
            <div class="roundHeader"><span>Round</span></div>
            <div class="roundField">&nbsp;</div>
        </div>
        <div class="initTable">
            <div class="initTableHeader">
                <div class="initTableCol1 initTableHeaderCell initTableCell">Name</div>
                <div class="initTableCol2 initTableHeaderCell initTableCell">Initiative</div>
                <div class="initTableCol3 initTableHeaderCell initTableCell">Order</div>
            </div>
            <div class="initTableRow initTableRow1">
                <div class="initTableCol1 initTableRowCell initTableCell"></div>
                <div class="initTableCol2 initTableRowCell initTableCell"></div>
                <div class="initTableCol3 initTableRowCell initTableCell"></div>
            </div>
            <div class="initTableRow initTableRow2">
                <div class="initTableCol1 initTableRowCell initTableCell"></div>
                <div class="initTableCol2 initTableRowCell initTableCell"></div>
                <div class="initTableCol3 initTableRowCell initTableCell"></div>
            </div>
            <div class="initTableRow initTableRow3">
                <div class="initTableCol1 initTableRowCell initTableCell"></div>
                <div class="initTableCol2 initTableRowCell initTableCell"></div>
                <div class="initTableCol3 initTableRowCell initTableCell"></div>
            </div>
            <div class="initTableRow initTableRow4">
                <div class="initTableCol1 initTableRowCell initTableCell"></div>
                <div class="initTableCol2 initTableRowCell initTableCell"></div>
                <div class="initTableCol3 initTableRowCell initTableCell"></div>
            </div>
            <div class="initTableRow initTableRow5">
                <div class="initTableCol1 initTableRowCell initTableCell"></div>
                <div class="initTableCol2 initTableRowCell initTableCell"></div>
                <div class="initTableCol3 initTableRowCell initTableCell"></div>
            </div>
            <div class="initTableRow initTableRow6">
                <div class="initTableCol1 initTableRowCell initTableCell"></div>
                <div class="initTableCol2 initTableRowCell initTableCell"></div>
                <div class="initTableCol3 initTableRowCell initTableCell"></div>
            </div>
            <div class="initTableRow initTableRow7">
                <div class="initTableCol1 initTableRowCell initTableCell"></div>
                <div class="initTableCol2 initTableRowCell initTableCell"></div>
                <div class="initTableCol3 initTableRowCell initTableCell"></div>
            </div>
            <div class="initTableRow initTableRow8">
                <div class="initTableCol1 initTableRowCell initTableCell"></div>
                <div class="initTableCol2 initTableRowCell initTableCell"></div>
                <div class="initTableCol3 initTableRowCell initTableCell"></div>
            </div>
            <div class="initTableRow initTableRow9">
                <div class="initTableCol1 initTableRowCell initTableCell"></div>
                <div class="initTableCol2 initTableRowCell initTableCell"></div>
                <div class="initTableCol3 initTableRowCell initTableCell"></div>
            </div>
            <div class="initTableRow initTableRow10">
                <div class="initTableCol1 initTableRowCell initTableCell"></div>
                <div class="initTableCol2 initTableRowCell initTableCell"></div>
                <div class="initTableCol3 initTableRowCell initTableCell"></div>
            </div>
            <div class="initTableRow initTableRow11">
                <div class="initTableCol1 initTableRowCell initTableCell"></div>
                <div class="initTableCol2 initTableRowCell initTableCell"></div>
                <div class="initTableCol3 initTableRowCell initTableCell"></div>
            </div>
            <div class="initTableRow initTableRow12">
                <div class="initTableCol1 initTableRowCell initTableCell"></div>
                <div class="initTableCol2 initTableRowCell initTableCell"></div>
                <div class="initTableCol3 initTableRowCell initTableCell"></div>
            </div>
            <div class="initTableRow initTableRow13">
                <div class="initTableCol1 initTableRowCell initTableCell"></div>
                <div class="initTableCol2 initTableRowCell initTableCell"></div>
                <div class="initTableCol3 initTableRowCell initTableCell"></div>
            </div>
            <div class="initTableRow initTableRow14">
                <div class="initTableCol1 initTableRowCell initTableCell"></div>
                <div class="initTableCol2 initTableRowCell initTableCell"></div>
                <div class="initTableCol3 initTableRowCell initTableCell"></div>
            </div>
            <div class="initTableRow initTableRow14">
                <div class="initTableCol1 initTableRowCell initTableCell"></div>
                <div class="initTableCol2 initTableRowCell initTableCell"></div>
                <div class="initTableCol3 initTableRowCell initTableCell"></div>
            </div>
            <div class="initTableRow initTableRow15">
                <div class="initTableCol1 initTableRowCell initTableCell"></div>
                <div class="initTableCol2 initTableRowCell initTableCell"></div>
                <div class="initTableCol3 initTableRowCell initTableCell"></div>
            </div>
            <div class="initTableRow initTableRow16">
                <div class="initTableCol1 initTableRowCell initTableCell"></div>
                <div class="initTableCol2 initTableRowCell initTableCell"></div>
                <div class="initTableCol3 initTableRowCell initTableCell"></div>
            </div>
            <div class="initTableRow initTableRow17">
                <div class="initTableCol1 initTableRowCell initTableCell"></div>
                <div class="initTableCol2 initTableRowCell initTableCell"></div>
                <div class="initTableCol3 initTableRowCell initTableCell"></div>
            </div>
            <div class="initTableRow initTableRow18">
                <div class="initTableCol1 initTableRowCell initTableCell"></div>
                <div class="initTableCol2 initTableRowCell initTableCell"></div>
                <div class="initTableCol3 initTableRowCell initTableCell"></div>
            </div>
        </div>
    </div>
</div>
</div>`;

const createNewPageElement = () => {
    let div = document.createElement('div');
    div.innerHTML = pageTemplate.trim();
    return div.firstChild;
};