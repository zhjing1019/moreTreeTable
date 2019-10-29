<script type="text/jsx">
// 创建表格头部
export default {
    data() {
        return {

        }
    },
    watch: {

    },
    components: {},

    inject: ["edit"],
    render(h) {
        let tr = this.createHead(h);
        return <table class="editTable__block" id="tb"><thead>{tr}</thead></table>
    },
    props: {
        allRow: {
            type: Boolean,
            defaule: false
        }
    },
    methods: {
      sync (prop, value) {
        this[prop] = value
      },


      createHead(h) {
        let [tr] = [[]];
        //左上角部分
        this.headTotal = this.edit.allHeadRow.length;
        this.edit.allColHeadRow.forEach( (x, index) => {
            if(index == 0) {
                for(let i = 0; i < this.edit.allHeadRow.length; i++) {
                    let cell = [];
                    if(i === 0) {
                        x.forEach((y) => {

                            cell.push(this.creatFirstHeadTr(h, y, i));
                        })
                    }
                    tr.push(<tr>{cell}</tr>)
                }
            }
        })
        // //左下角部分；
        if(this.allRow) {
            this.edit.resetNewColHead.forEach((x) => {
                let cell = [];
                x.forEach((y) => {
                    if(y && y !== null) {
                        let height = y.colSpan * this.edit.tableTdHeight;
                        cell.push(<th colspan={y.rowSpan} rowspan={y.colSpan} style={{ width: this.edit.headColWidth + "px", height: height + "px", textAlign: this.edit.textAlign}}>{y.name}</th>)
                    }
                })
                tr.push(<tr>{cell}</tr>);
            });
        }


        return tr;
      },


      creatFirstHeadTr(h, y, i) {
            if(i == 0) {

                let [data, colspan, rowspan, colspanCount, width] = [this.edit.headGrage([y]), 1, 1, 1, 0];
                colspanCount = this.edit.allHeadRow && this.edit.allHeadRow.length ? this.edit.allHeadRow.length : 1;
                colspan = data.length > 1 ? data.length : 1;
                rowspan = colspanCount;
                data.forEach((x, index) => {
                    if(index !== 0 && x[0]) {
                        width += this.edit.headColWidth
                    }
                })
                let height = this.edit.tableTdHeight * this.edit.allHeadRow.length;
                return (<th colspan={colspan - 1} rowspan={rowspan} style={{ width: width + "px", height: height + "px", textAlign: this.edit.textAlign,  borderRight: this.edit.moreHead ? "" : "1px solid #d9d9d9", paddingLeft: 0 }}>{y.name}</th>)
            }
        },
    }
}
</script>
<style lang="scss"></style>
