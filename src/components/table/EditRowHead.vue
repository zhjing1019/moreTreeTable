<script type="text/jsx">
import StandardCascader from "./StandardCascader.vue"


// 创建表格头部
export default {
    data() {
        return {
        }
    },
    watch: {

    },
    components: {StandardCascader},


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
      createHead(h) {
        let [tr] = [[]];

        this.edit.resetNewRowHead.forEach((x) => {
            let cell = [];
            x.forEach((y) => {
                if(y && y !== null) {
                    let height = y.rowSpan * (this.edit.tableTdHeight - 1);
                    let thPopover = this.popoverCell(h, y, height);
                    cell.push(<th colspan={y.colSpan} rowspan={y.rowSpan} style={{ width: this.edit.headColWidth + "px", height: height + "px", textAlign: this.edit.textAlign}}>{thPopover}</th>)
                }
            })
            tr.push(<tr>{cell}</tr>);
        });
        return tr;
      },
      popoverCell(h, data, height) {
        let cell = (<standard-cascader data={data} height={height} list={this.edit.initList2} position="bottom"
        onpopoverChange={(value) => {
            this.$emit('popoverChange', value);
        }}
        ></standard-cascader>)
        return cell
      },


    }
}
</script>
