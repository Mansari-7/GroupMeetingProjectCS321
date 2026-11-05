export default function SearchBar() {
  return (
    <div>
      <h2>Search Course</h2>
      <input type="text" placeholder="Search course: " />
      <h2>Location</h2>
      <select>
        <option> On campus</option>
        <option> online</option>
      </select>
    </div>
  );
}
