
function Signin(){
    return(
        <div>
            <form action="http://localhost:3000/signin" method="post">
                <input type="text" name="email" id="1" />
                <input type="password" name="password" id="2" />
                <input type="submit" value="submit" />
            </form>
        </div>
    )
}

export default Signin