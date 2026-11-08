export default function SideBar() {
  return (
    <section>
    <div class="sidenav">
        <a href="#">Group Size</a>
        <select name ="GroupSize" id = "GroupSize">
            <option value="3 or less">3 or less</option>
            <option value="4">4</option>
            <option value="5 or more" selected>5 or more</option>
        </select>
        <a href="#">Location</a>
        <select name ="Location" id = "Location">
            <option value="In Person">In person</option>
            <option value="Online">Online</option>
        </select>
        <a href="#">Courses</a>
        <select name ="Courses" id = "Courses">
            <option value="CS330">CS330</option>
            <option value="CS321">CS321</option>
            <option value="PHYS106">PHYS106</option>
            <option value="ECE301">ECE301</option>
            <option value="CS310">CS310</option>
        </select>
        <a href="#">Meeting Time</a>
        <select name ="Meeting Time" id = "Meet Time">
            <option value="3:30">3:30</option>
            <option value="4:30">4:30</option>
            <option value="5:30">5:30</option>
            <option value="6:30">6:30</option>
            <option value="7:30">7:30</option>
        </select>
    </div>
    </section>
  );
}