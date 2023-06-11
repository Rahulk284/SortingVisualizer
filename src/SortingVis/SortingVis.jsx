import React from "react";
import { animateMergeSort, animateQuickSort, animateSelectionSort, animateHeapSort } from "../SortingAlgorithms/SortingAlgorithms";
import './SortingVis.css';


const PRIMARY_COLOR = 'rgb(92, 140, 217)';
const SECONDARY_COLOR = 'red';

export default class SortingVis extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            array: [],
            speed: 50,
            size: 100,
            isRunning: false,
        };
    };

    componentDidMount(){
        this.resetArray();
    }

    resetArray(size = this.state.size) {
        if(!this.isRunning){
            const array = [];
            for (let i = 1; i < size; i++) {
                array.push(randonInteger(5, 530)); // started the interval at 5 so the smallest bar is still visible in the visual
            }
            const speed = size < 10 ? 250 : (238 - size) / 4; 
            this.setState({ array, speed });
            this.resetColors();
        }  
    }

    mergeSort() {
        if(!this.isRunning){
            this.disableSlider();
            this.isRunning = true;
            this.resetColors();
            const animations = animateMergeSort(this.state.array);
            const animationSpeed = this.state.speed;
            console.log(animationSpeed);
            for (let i = 1; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('arrayBar');
                const isColorChange = i % 3 !== 2;
                if (isColorChange) {
                    const [barOneIdx, barTwoIdx] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, i * animationSpeed);
                } else {
                    setTimeout(() => {
                        const [barOneIdx, newHeight] = animations[i];
                        const barOneStyle = arrayBars[barOneIdx].style;
                        barOneStyle.height = `${newHeight}px`;
                    }, i * animationSpeed);
                }
                if (i === animations.length - 1) {
                    setTimeout(() => {
                        for (let j = 0; j < arrayBars.length; j++) {
                            arrayBars[j].style.backgroundColor = 'rgb(133, 230, 133)';
                        } 
                        this.isRunning = false;
                        this.enableSlider();
                    }, i * animationSpeed);
                }
            }
        } 
    }
    
    
    quickSort() {
        if(!this.isRunning){
            this.isRunning = true;
            this.disableSlider();
            this.resetColors();
            const animationSpeed = this.state.speed;
            
            const animations = animateQuickSort(this.state.array);
            for (let i = 0; i < animations.length; i++) {
                const [barOneIdx, barTwoIdx, isSwitch, isPivot] = animations[i];
                const arrayBars = document.getElementsByClassName('arrayBar');
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
      
                setTimeout(() => {
                    barOneStyle.backgroundColor = isPivot ? 'pink' : isSwitch ? 'red' : 'lightgreen';
                    barTwoStyle.backgroundColor = isPivot ? 'pink' : 'red';
                    if (isSwitch) {
                        const tempHeight = barOneStyle.height;
                        barOneStyle.height = barTwoStyle.height;
                        barTwoStyle.height = tempHeight;
                    }
                    if (i === animations.length - 1) {
                        setTimeout(() => {
                            for (let j = 0; j < arrayBars.length; j++) {
                                arrayBars[j].style.backgroundColor = 'rgb(133, 230, 133)';
                            }
                            this.isRunning = false;
                            this.enableSlider();
                        }, animationSpeed);
                    } else {
                        setTimeout(() => {
                            barOneStyle.backgroundColor = PRIMARY_COLOR;
                            barTwoStyle.backgroundColor = PRIMARY_COLOR;
                        }, animationSpeed);
                    }
                }, i * animationSpeed);
            }
        }    
    } 


    heapSort() {
        if(!this.isRunning) {
            this.isRunning = true;
            this.disableSlider();
            this.resetColors();
            const array = this.state.array;
            const animations = animateHeapSort(array);
            const animationSpeed = this.state.speed;
        
            for (let i = 0; i < animations.length; i++) {
                const [barOneIdx, barTwoIdx, isSwitch] = animations[i];
                const arrayBars = document.getElementsByClassName('arrayBar');
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
        
                setTimeout(() => {
                    barOneStyle.backgroundColor = isSwitch === 1 ? 'red' : 'lightgreen';
                    barTwoStyle.backgroundColor = isSwitch === 1 ? 'red' : 'lightgreen';
            
                    if (isSwitch === 1) {
                        const tempHeight = barOneStyle.height;
                        barOneStyle.height = barTwoStyle.height;
                        barTwoStyle.height = tempHeight;
                    }
            
                    setTimeout(() => {
                        barOneStyle.backgroundColor = PRIMARY_COLOR;
                        barTwoStyle.backgroundColor = PRIMARY_COLOR;
            
                        if (i === animations.length - 1) {
                            this.isRunning = false;
                            this.enableSlider();
            
                            for (let j = 0; j < arrayBars.length; j++) {
                                arrayBars[j].style.backgroundColor = 'rgb(133, 230, 133)';
                            }
                        }
                    }, animationSpeed);
            
                }, i * animationSpeed);
            }
        }
    }
    

    selectionSort() {
        if(!this.isRunning) {
            this.isRunning = true;
            this.disableSlider();
            this.resetColors();
            const animations = animateSelectionSort(this.state.array);
            const animationSpeed = this.state.speed;
            for (let i = 1; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('arrayBar');
                const [barOneIdx, barTwoIdx, isSwitch] = animations[i];
                if(!isSwitch) {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const color = 'red'
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, i * (animationSpeed - 10));
                    setTimeout(() => {
                        barOneStyle.backgroundColor = PRIMARY_COLOR;
                        barTwoStyle.backgroundColor = PRIMARY_COLOR;
                    }, (i + 1) * (animationSpeed - 10));
                } else {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    setTimeout(() => {
                        const tempHeight = barOneStyle.height;
                        barOneStyle.height = barTwoStyle.height;
                        barTwoStyle.height = tempHeight;
                        let sortedBar = barTwoStyle;
                        sortedBar.backgroundColor = 'rgb(133, 230, 133)';
                    }, i * (animationSpeed - 10))
                }
                if (i === animations.length - 1) {
                    setTimeout(() => {
                        this.isRunning = false;
                        this.enableSlider();
                    }, i * (animationSpeed - 10));
                }
            }
        }
    }

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ size: parseInt(value, 10) }, () => {
          this.resetArray();
        });
      };

    disableSlider() {
        const slider = document.getElementById('changeSize');
        if (slider) {
            slider.disabled = true;
        }
    }
      
    enableSlider() {
        const slider = document.getElementById('changeSize');
        if (slider) {
            slider.disabled = false;
        }
    }

    resetColors() {
        const arrayBars = document.getElementsByClassName('arrayBar');
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
        }
    }

    render(){
        const{array} = this.state;

        return(
            <div className="arrayWrapper">
                <div className="array-container">
                    <div className="bars">
                        {array.map((value,idx) => (
                            <div 
                            className="arrayBar" 
                            key={idx}
                            style={{height: `${value}px`}}></div>
                        ))}
                    </div>
                </div>
                <nav>
                    <div className="buttons">
                    <div className="button-group">
                        <button onClick={() => this.resetArray()}>Generate New Array</button>
                        <button onClick={() => this.mergeSort()}>Merge Sort</button>
                        <button onClick={() => this.quickSort()}>Quick Sort</button>
                        <button onClick={() => this.heapSort()}>Heap Sort</button>
                        <button onClick={() => this.selectionSort()}>Selection Sort</button>
                    </div>
                    </div>
                </nav>
                <div className="slider-container">
                    <div className="sizeSpeed">Change Array Size & Sorting Speed:</div>
                    <input
                        className="slider"
                        id="changeSize"
                        type="range"
                        min="5"
                        max="175"
                        value={this.state.size}
                        style={{background: 'rgb(163, 208, 223)'}}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        );
    }
}

function randonInteger(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
