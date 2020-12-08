const frontHandler = new FrontHandler();
const con = new SwitchConnection(frontHandler);

window.addEventListener('load', ()=> {
	con.initialize();
});
