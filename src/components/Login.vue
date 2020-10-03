<template>
    <div :class="[$style.main, $style.center]">
        <div :class="[$style.box, $style.center]">
            <div :class="[$style.icon, $style.center]">
                <i class="far fa-user"></i>
            </div>
            <h1>Login</h1>
            <div>
                <p>Email:</p>
                <input type="text" name="" id="" placeholder="Enter your email" />
            </div>
            <div>
                <p>Password:</p>
                <input type="text" name="" id="" placeholder="Enter your password">
            </div>
            <button :class="$style.btn">Login</button>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style module>

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.main {
    width: 100%;
    height: 100vh;
}

.box {
    width: 18em;
    height: 450px;
    background: white;
    color: black;
    margin: 0 20px;
    overflow: hidden;
    flex-direction: column;
    position: fixed;
}

.box div {
    margin: 5px 0;
}

.box p {
    text-align: left;
    margin-bottom: 5px;
}

.box div input{
    position: unset;
    width: 220px;
    height: 30px;
    margin-top: 5px;
    background: none;
    border: none;
    outline: none;
    color: black;
    border-bottom: 1px solid rgba(0, 0, 0, 0.609);
    cursor: pointer;
    transition: border-bottom 300ms;
}

.box div input:focus{
    border-bottom: 2px solid #4f58ff;
}

.box h1{
    margin: 60px 0 20px 0;
}

.box .icon{
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
    height: 100px;
    border-radius: 0 0 50% 50%;
    background: #4f58ff;
    box-shadow: 0px 0px 20px rgb(144, 144, 144);
    align-items: flex-end;
}

.box .icon i{
    color: white;
    margin-bottom: 10px;
    font-size: 2rem;
}

.btn{
    width: 220px;
    height: 30px;
    margin-top: 20px;
    background: none;
    border: none;
    outline: none;
    background: #4f58ff;
    color: white;
    border-radius: 10px;
}

</style>
