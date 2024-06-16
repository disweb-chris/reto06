import Header from "./Header";
import Footer from "./Footer";

function Layout(props) {
    const {children} = props
    return ( 
        <>
            <Header></Header>
            {children}
            <Footer></Footer>
        </>
        
     );
}

export default Layout;