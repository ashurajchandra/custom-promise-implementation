const state = {
    PENDING:'Pending',
    FULFILLED:'Fulfilled',
    REJECTED:'Rejected'
}

class Promise1{
    constructor(handlerFunc){
        this._status = state.PENDING
        this._value = null
        // this._successCb = new Map()
        // this.failureCb = new Map()
        this._successCb = []
        this._failureCb = []

        const resolve = (value)=>{
          if(this._status===state.PENDING){
            this._status =state.FULFILLED
            this._value = value
            // this._successCb.forEach(([value,key])=>{
            //     alert("hii")
            //     console.log("key-value",key, value)
            // })
            this._successCb.forEach((cb)=>cb(value))
          }
        }
        const reject = (value)=>{
            if(this._status===state.PENDING){
                this._status =state.REJECTED
                this._value = value
                this._failureCb.forEach((cb)=>cb(value))
              }
        }

        try{
            handlerFunc(resolve,reject)
        }catch(err){
           reject(err)
        }
    }

    then(onSuccess, onFailure=()=>{}){
        if(this._status===state.PENDING){
            // const key = Symbol()
            // if(!this._successCb.has(key)){
            //     this._successCb[key] = [onSuccess]
            // }
            // this._successCb[key].push()

            //const key = Symbol()
            // if(!this.failureCb.has(key)){
            //     this.failureCb[key] = [onFailure]
            // }
            // this.failureCb[key].push()

            this._successCb.push()
            this._failureCb.push()
        }
        if(this._status==state.FULFILLED){
            onSuccess(this._value)
            // const key = Symbol()
            // if(!this._successCb.has(key)){
            //     this._successCb[key] = [onSuccess]
            // }
            // this._successCb[key].push()
        }else if(this._status==state.REJECTED){
            onFailure(this._value)
            // const key = Symbol()
            // if(!this.failureCb.has(key)){
            //     this.failureCb[key] = [onSuccess]
            // }
            // this.failureCb[key].push()
        }

        console.log("succes-cb",this._successCb)
        console.log("failure-cb",this.failureCb)
    }

    catch(onFailure){
        // console.log("onFailure",onFailure)
        if(this._status==state.REJECTED){
            onFailure(this._value)
            // const key = Symbol()
            // if(!this.failureCb.has(key)){
            //     this.failureCb = [onSuccess]
            // }
            // this.failureCb[key].push()
        }
    }
}


const p = new Promise1((resolve,reject)=>{
    // console.log("resolve",resolve)
    // console.log("reject",reject)
    resolve("resolved....")
})
const p2 = new Promise1((resolve,reject)=>{
    // console.log("resolve",resolve)
    // console.log("reject",reject)
    reject("rejected....")
})
console.log("p",p)
console.log("p2",p2)
p.then((val)=>console.log("val-p1",val))
//p2.then((val)=>console.log("val-p2",val)).catch((err)=>console.log("err",err))
 p2.then((val)=>console.log("val-p2",val), (err)=>console.log("err",err))

 const p3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log("running timer cb")
       resolve("resolved after 2 second")
    },2000)
 })
 const p4 = new Promise1((resolve,reject)=>{
    setTimeout(()=>{
        console.log("running timer cb.....p4")
       resolve("resolved after 2 second.....p4")
    },2000)
 })
console.log("p3",p3)
console.log("p4",p4)
 p3.then((val)=>console.log("p3-val",val))
 p4.then((val)=>console.log("p4-val",val))