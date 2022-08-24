document.getElementById("branchdetails").addEventListener("submit", (e) => {
    e.preventDefault();
    const branchName = e.target[0].value;
    const branchNumber = e.target[1].value;
    const clerkName = e.target[2].value;
    const email = e.target[3].value;
    const password = e.target[4].value;
    const singleBedNo = e.target[5].value;
    const deluxeNo = e.target[6].value;
    const suiteNo = e.target[7].value;
})