export default function html([first,...strings],...values){
    return values.reduce(
        (acc,curr)=> acc.concat(curr ,strings.shift()),
        [first]
    )
    .filter(x => x && x !== true || x === 0)
    .join('')
}

export function createStore(reducer){
    // dữ liệu trong store (trạng thái)
    let state = reducer();

    const roots = new Map();

    // Lặp qua root để render ra View 
    function render(){
        // [root , component] : destructuring :là làm đối số
        for (const [root , component] of roots){
            // component() : Là một function return ra một chuỗi html
            const output = component();
            root.innerHTML = output;
        }
    }
    return {
        // Nhận View đẩy ra root element
        attach(component , root){
            // Root là key và component là value 
            roots.set(root, component);
            render()

        },
        //Phương thức kết nối Store và View 
    //Hàm connect nhận vào đối số selector từ người dùng nhập vào hoặc 
    // ko nhập sẽ lấy giá trị mặc đinhj state

    // Selector là một dữ liệu cụ thể trong Store như nháy chuột ....
         connect(selector = state => state){
            // Đối số của component(props,...arg)
           return component => (props, ...args)=>
                component(Object.assign({},props,selector(state),...args))
         },
        //  Dispatch là một hành động của View + thêm những dữ liệu cần xóa và dữ liệu cần thêm
        dispatch(action, ...args){
            state = reducer(state,action,args);
            render();
         }
    }
}

// function highlight([first, ...strings], ...values) {
//     return values.reduce((acc, curr) => [...acc, `<span>${curr}</span>`, strings.shift()],
//         [first]
//     )
//         .join('');
// }

// function highlight(...value){
//     console.log(value)
// }
// var brand = 'Acecook';
// var course = 'Hảo Hảo';


// const html = highlight`Mì gói ${course} là của ${brand}!`;
// console.log(html);
