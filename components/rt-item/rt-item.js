﻿/* 模块功能:
 *          实时数据项显示组件
 * 包含属性：
 *          1.label:string - 数据项目名称
 *          2.value:float  - 数据实时值
 * 控制参数:
 *          1.round:string - 保留小数点后数据位数
 *          
 * 修改日期: 2023-6-12
 * 
 * 修改履历:
 *          1. 将属性接口Value修改为value以匹配数据模型绑定方法中对.value的统一访问
 *  
 */

class RealTimeItem extends HTMLElement {
    //属性定义
    #label = 'name';  // 数据名称
    #value = 888.8;   // 当前数据值
    #round = 0;       // 保留小数位数
    #unit = "";       // 物理量单位 
    #min = undefined; // 最小值(低于该值则显示字体为红色)
    #max = undefined; // 最大值(高于该值则显示字体为红色)
    #displaycolor = 'normal';   // 数值显示颜色

    constructor(label, round, unit) {
        super();

        this.#label = label;
        this.#round = round;
        this.#unit = unit;
    }

    //getter setter
    set Label(data) {
        this.#label = data;
        this.render();
    }

    get Label() {
        return this.#label;
    }

    set value(data) {
        switch (this.#round) {
            case '0':
                this.#value = Math.round(data);
                if(this.#value > this.#max || this.#value < this.#min) {
                    this.#displaycolor = 'alert';
                } else {
                    this.#displaycolor = 'normal';
                }
                break;
            case '1':
                this.#value = Math.round((data + Number.EPSILON) * 10) / 10;
                if(parseInt(this.#value * 10) > parseInt(this.#max * 10) 
                  || parseInt(this.#value * 10) < parseInt(this.#min * 10)) {
                    this.#displaycolor = 'alert';
                } else {
                    this.#displaycolor = 'normal';
                }
                break;
            case '2':
                this.#value = Math.round((data + Number.EPSILON) * 100) / 100;
                if(parseInt(this.#value * 100) > parseInt(this.#max * 100) 
                  || parseInt(this.#value * 100) < parseInt(this.#min * 100)) {
                    this.#displaycolor = 'alert';
                } else {
                    this.#displaycolor = 'normal';
                }                
                break;
            case '3':
                this.#value = Math.round((data + Number.EPSILON) * 1000) / 1000;
                if(parseInt(this.#value * 1000) > parseInt(this.#max * 1000) 
                  || parseInt(this.#value * 1000) < parseInt(this.#min * 1000)) {
                    this.#displaycolor = 'alert';
                } else {
                    this.#displaycolor = 'normal';
                }
                break;
        }
        this.render();
    }

    get value() {
        return this.#value;
    }

    set Round(data) {
        this.#round = data;
    }

    get Round() {
        return this.#round;
    }

    set Unit(data) {
        this.#unit = data;
        this.render();
    }

    get Unit() {
        return this.#unit;
    }

    set max(data) {
        this.#max = data;
    }

    get max() {
        return this.#max;
    }

    set min(data) {
        this.#min = data;
    }

    get min() {
        return this.#min;
    }

    static get observedAttributes() {
        return ['label', 'round', 'value', 'unit', 'min', 'max']
    }

    //回调函数
    attributeChangedCallback(item, oldvalue, newvalue) {
        switch (item) {
            case 'label':
                this.Label = newvalue;
                break;
            case 'round':
                this.Round = newvalue;
                break;
            case 'value':
                this.value = newvalue;
                break;
            case 'unit':
                this.Unit = newvalue;
                break;
            case 'min':
                this.min = newvalue;
                break;
            case 'max':
                this.max = newvalue;        
                break;
        }
    }

    connectedCallback() {

    }

    disconnectedCallback() {

    }

    // 组件样式
    get style() {

    }

    //组件HTML模板
    get template() {
        return `            
            <div class="rt-item">
                <div class="header">
                    ${this.#label} ${this.#unit}
                </div>
                <div class="value ${this.#displaycolor}">
                    ${this.#value}
                </div>
            </div>
        `;
    }

    //渲染函数
    render() {
        this.innerHTML = this.template;
    }
}

customElements.define('rt-item', RealTimeItem);

export { RealTimeItem }