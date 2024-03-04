$(document).ready(function() {
    $('#openModalBtn').click(function() {
        $('#myModal').css('display', 'block');
    });

    $('.close').click(function() {
        $('#myModal').css('display', 'none');
    });

    $(window).click(function(event) {
        if (event.target == $('#myModal')[0]) {
            $('#myModal').css('display', 'none');
        }
    });

    $('#bucketListForm').submit(function(event) {
        event.preventDefault();
        const topic = $('#topic').val();
        const startDate = new Date($('#start_date').val());
        const endDateValue = $('#end_date').val();
        console.log('End Date Value:', endDateValue);
        const endDate = new Date(endDateValue);

        const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
        const timeframe = differenceInMilliseconds / (1000 * 3600 * 24);

        const searchParams = new URLSearchParams();
        searchParams.append('topic', topic);
        searchParams.append('startDate', startDate);
        searchParams.append('endDate', endDate);
        searchParams.append('timeframe', timeframe);
    
        window.location.href = '/add?' + searchParams.toString();
        
        $('#myModal').css('display', 'none');
    });
    
});

//Swal function
$(document).on('click', '.delete-bucket', function() {
    // const itemId = $(this).data('id');
    const itemId = $(this).data('id');
    event.preventDefault(); 
    event.stopPropagation(); 
    const row = $(this).closest('tr'); // Get the closest row to the delete button
    const topic = row.find('td:first').text(); 

    Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.isConfirmed) {
            // Redirect to the delete route with the item ID
            window.location.href = `/remove/${itemId}`;
        }
    });
});

$(document).ready(function() {
    // Edit Bucket Item
    $(document).on('click', '.edit-bucket', function() {
        event.preventDefault(); 
        const itemId = $(this).data('id');
        const row = $(this).closest('tr'); // Get the closest row to the edit button
        const topic = row.find('td:first').text();
        const startDate = new Date(row.find('td:nth-child(2)').text()).toISOString().split('T')[0];
        const endDate = new Date(row.find('td:nth-child(3)').text()).toISOString().split('T')[0];

        // Set the values in the edit form
        $('#edit_topic').val(topic);
        $('#edit_start_date').val(startDate);
        $('#edit_end_date').val(endDate);

        // Set the data-id attribute on the form for use in the submit event
        $('#editBucketForm').data('id', itemId);

        // Show the edit modal
        $('#editModal').css('display', 'block');
    });

    // Close the edit modal when the close button is clicked
    $(document).on('click', '.close', function() {
        $('#editModal').css('display', 'none');
    });

    //Submit Edit form
    $('#editBucketForm').submit(function(event) {
        event.preventDefault();

        const topic = $('#edit_topic').val();
        const startDate = $('#edit_start_date').val();
        const endDate = $('#edit_end_date').val();

        const searchParams = new URLSearchParams();
        searchParams.append('topic', topic);
        searchParams.append('startDate', startDate);
        searchParams.append('endDate', endDate);

        const itemId = $(this).data('id');
        window.location.href = `/edit/${itemId}?` + searchParams.toString();

        $('#editModal').css('display', 'none');
    });
});
