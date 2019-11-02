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
      createHead() {
        let [tr] = [[]];
        //左上角部分
        if(this.edit.rowData && this.edit.rowData.length > 0) {
            let rowspan = this.edit.allHeadRow.length;
            let colspan = this.edit.allColHeadRow.length;
            for(let i = 0; i < rowspan; i++) {
                if(i === 0) {
                    let width = colspan * this.edit.headColWidth;
                    let height = rowspan * this.edit.tableTdHeight;
                    let cell = (<th colspan={colspan} rowspan={rowspan} style={{width: width + 'px', height: height + 'px'}}> </th>)
                    tr.push(<tr>{cell}</tr>)
                } else {
                    tr.push(<tr></tr>)
                }
            }
        }
        
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


    }
}
</script>
<style lang="scss"></style>
