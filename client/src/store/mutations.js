import { 
    INCREASE,
} from './mutations_type.js'

export default{
    [INCREASE](state,num) {
        console.log(num);
        state.count += parseInt(num);
    },
}