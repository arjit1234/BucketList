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

