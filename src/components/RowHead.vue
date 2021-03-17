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
      createHead() {
        let [tr] = [[]];
        this.edit.resetNewRowHead.forEach((x) => {
            let cell = [];
            x.forEach((y) => {
                if(y && y !== null) {
                    let height = y.rowSpan * (this.edit.tableTdHeight);
                    cell.push(<th colspan={y.colSpan} rowspan={y.rowSpan} style={{ width: this.edit.headColWidth + "px", height: height + "px", textAlign: this.edit.textAlign}}>{y.name}</th>)
                }
            })
            tr.push(<tr>{cell}</tr>);
        });
        return tr;
      }
    }
}
</script>
