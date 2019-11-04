## moreTreeTable是一个具有横向表头和纵向表头的表头，切横向表头和纵向表头均支持树形结构数据，形成树形表头的表格

*MoreTreeTable is a table header with a horizontal and a vertical header that supports tree structure data to form a table with a tree header*

### moreTreeTabel支持多向表头，并且支持横向和纵向的树形结构的表头 
[![](https://github.com/zhjing1019/moreTreeTable/blob/master/src/assets/video1.gif)](https://github.com/zhjing1019/moreTreeTable/blob/master/src/assets/video1.gif "markdown") 
[![](https://github.com/zhjing1019/moreTreeTable/blob/master/src/assets/img1.png)](https://github.com/zhjing1019/moreTreeTable/blob/master/src/assets/img1.png "markdown") 
### moreTreeTabel纵向表头表格 
[![](https://github.com/zhjing1019/moreTreeTable/blob/master/src/assets/video2.gif)](https://github.com/zhjing1019/moreTreeTable/blob/master/src/assets/video2.gif "markdown") 
[![](https://github.com/zhjing1019/moreTreeTable/blob/master/src/assets/img2.png)](https://github.com/zhjing1019/moreTreeTable/blob/master/src/assets/img2.png "markdown") 
### moreTreeTabel横向表头表格
[![](https://github.com/zhjing1019/moreTreeTable/blob/master/src/assets/img3.png)](https://github.com/zhjing1019/moreTreeTable/blob/master/src/assets/img3.png "markdown") 

### 启动该项目 
```javascript
npm run serve
```
### 下载该组件 
```javascript
npm install more-tree-table
```
# 使用该组件 
### 多表头表格 
```html
    <more-tree-table :colData="colHead" :rowData="rowHead" :tableValue="tableValue1"></more-tree-table>
``` 
**colData: 为Array，是指竖向表头的数据，可以是树形结构的表头** 

**rowData: 为Array，是指横向表头的数据** 

**tableValue: 为Object，是指表格的数据，tableValue中的key为 ’横向表头的id__纵向表头的id** 

colData的值和rowData的值 

```javascript
rowData: [
        {
            id: "1111",
            name: "测试1",
            children: [
                {
                    id: "1111-1",
                    name: "测试1-1",
                    children: [
                        {
                            id: "1111-1-2",
                            name: "测试1-1-2",
                        },
                        {
                            id: "1111-1-3",
                            name: "测试1-1-4",
                        },
                    ]
                },
                {
                    id: "1111-2",
                    name: "测试1-2",
                    children: [
                        {
                            id: "1111-2-2",
                            name: "测试1-2-2",
                        },
                        {
                            id: "1111-2-3",
                            name: "测试1-2-4",
                        },
                    ]
                },
                {
                    id: "1111-3",
                    name: "测试1-3",
                    children: [
                        {
                            id: "1111-3-2",
                            name: "测试1-3-2",
                        },
                        {
                            id: "1111-3-3",
                            name: "测试1-3-4",
                        },
                    ]
                },
                {
                    id: "1111-4",
                    name: "测试1-4",
                },
                
            ]
        },
        {
            id: "2222",
            name: "测试1",
            children: [
                {
                    id: "2222-1",
                    name: "测试1-1",
                    children: [
                        {
                            id: "2222-1-2",
                            name: "测试1-1-2",
                        },
                        {
                            id: "2222-1-3",
                            name: "测试1-1-4",
                        },
                    ]
                },
                {
                    id: "2222-2",
                    name: "测试1-2",
                    children: [
                        {
                            id: "2222-2-2",
                            name: "测试1-2-2",
                        },
                        {
                            id: "2222-2-3",
                            name: "测试1-2-4",
                        },
                    ]
                },
                {
                    id: "2222-3",
                    name: "测试1-3",
                    children: [
                        {
                            id: "2222-3-2",
                            name: "测试1-3-2",
                        },
                        {
                            id: "2222-3-3",
                            name: "测试1-3-4",
                        },
                    ]
                },
                {
                    id: "2222-4",
                    name: "测试1-4",
                },
                
            ]
        },
    ],
    colData: [
        {
            id: "1111",
            name: "测试1",
            children: [
                {
                    id: "1111-1",
                    name: "测试1-1",
                    children: [
                        {
                            id: "1111-1-2",
                            name: "测试1-1-2",
                        },
                        {
                            id: "1111-1-3",
                            name: "测试1-1-4",
                        },
                    ]
                },
                {
                    id: "1111-2",
                    name: "测试1-2",
                    children: [
                        {
                            id: "1111-2-2",
                            name: "测试1-2-2",
                        },
                        {
                            id: "1111-2-3",
                            name: "测试1-2-4",
                        },
                    ]
                },
                {
                    id: "1111-3",
                    name: "测试1-3",
                    children: [
                        {
                            id: "1111-3-2",
                            name: "测试1-3-2",
                        },
                        {
                            id: "1111-3-3",
                            name: "测试1-3-4",
                        },
                    ]
                },
                {
                    id: "1111-4",
                    name: "测试1-4",
                },
                
            ]
        },
        {
            id: "2222",
            name: "测试1",
            children: [
                {
                    id: "2222-1",
                    name: "测试1-1",
                    children: [
                        {
                            id: "2222-1-2",
                            name: "测试1-1-2",
                        },
                        {
                            id: "2222-1-3",
                            name: "测试1-1-4",
                        },
                    ]
                },
                {
                    id: "2222-2",
                    name: "测试1-2",
                    children: [
                        {
                            id: "2222-2-2",
                            name: "测试1-2-2",
                        },
                        {
                            id: "2222-2-3",
                            name: "测试1-2-4",
                            children: [
                                {
                                    id: "2222-2-3-1",
                                    name: "测试1-2-2",
                                },
                                {
                                    id: "2222-2-3-2",
                                    name: "测试1-2-2",
                                },
                            ]
                        },
                    ]
                },
                {
                    id: "2222-3",
                    name: "测试1-3",
                    children: [
                        {
                            id: "2222-3-2",
                            name: "测试1-3-2",
                        },
                        {
                            id: "2222-3-3",
                            name: "测试1-3-4",
                        },
                    ]
                },
                {
                    id: "2222-4",
                    name: "测试1-4",
                },
                
            ]
        },
    ],

``` 
tableValue的值 
```javascript
//多项表头的数据
    tableValue1: {
        '1111-1-2__1111-1-2': '测试数据1',
        '1111-1-3__1111-1-3': '测试数据2',
        '1111-2-2__1111-2-2': '测试数据3',
        '1111-2-3__1111-2-3': '测试数据4',
        '1111-3-2__1111-3-2': '测试数据5',
        '2222-3-3__2222-3-3': "测试数据6",
        '2222-4__2222-4': '测试数据7'
    },
``` 

### 纵向表头表格 
```html
    <more-tree-table :colData="colHead" :tableValue="tableValue2"></more-tree-table>

``` 
**colData: 为Array，是指竖向表头的数据，可以是树形结构的表头**  

**tableValue: 为Array，数组的每一项为对象，对象中的key和纵向的id对应**  

colData的值同上 


tableValue的值 
```javascript
    //纵向表头数据
    tableValue2: [
        {
            '1111-1-2': "1",
            '1111-1-3': "2",
            '1111-2-2': "3",
            '1111-2-3': "4",
            '1111-3-2': "5",
            '2222-3-3': "6",
            '2222-4': "7"
        },
    ],
``` 

### 横向表头表格 
```html
    <more-tree-table :rowData="rowHead" :tableValue="tableValue2"></more-tree-table>

``` 
**rowData: 为Array，是指横向向表头的数据，可以是树形结构的表头**  

**tableValue: 为Array，数组的每一项为对象，对象中的key和横向的id对应** 

rowData的值同上 


tableValue的值 
```javascript
    //横向表头数据
    tableValue3: [
        {
            '1111-1-2': "1",
            '1111-1-3': "2",
            '1111-2-2': "3",
            '1111-2-3': "4",
            '1111-3-2': "5",
            '2222-3-3': "6",
            '2222-4': "7"
        },
    ],
``` 