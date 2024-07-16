let token = '';

$(document).ready(function() {
    $('#fetch-verse').click(function() {
        const book = $('#book').val();
        const chapter = $('#chapter').val();
        const verse = $('#verse').val();

        $.ajax({
            url: `http://localhost:5000/api/verse?book=${book}&chapter=${chapter}&verse=${verse}`,
            method: 'GET',
            success: function(data) {
                $('#verse-display').html(`${data.text} <button class="bookmark" data-id="${data._id}">Bookmark</button>`);
            },
            error: function(error) {
                console.error(error);
                $('#verse-display').text('Verse not found.');
            }
        });
    });

    $('#search-verse').click(function() {
        const keyword = $('#search-keyword').val();

        $.ajax({
            url: `http://localhost:5000/api/search?keyword=${keyword}`,
            method: 'GET',
            success: function(data) {
                let resultsHtml = '';
                data.forEach(verse => {
                    resultsHtml += `<div>${verse.book} ${verse.chapter}:${verse.verse} - ${verse.text}</div>`;
                });
                $('#search-results').html(resultsHtml);
            },
            error: function(error) {
                console.error(error);
                $('#search-results').text('No results found.');
            }
        });
    });

    $('#register').click(function() {
        const username = $('#username').val();
        const password = $('#password').val();

        $.ajax({
            url: 'http://localhost:5000/api/register',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username, password }),
            success: function(data) {
                $('#auth-status').text('User registered');
            },
            error: function(error) {
                console.error(error);
                $('#auth-status').text('Registration failed');
            }
        });
    });

    $('#login').click(function() {
        const username = $('#username').val();
        const password = $('#password').val();

        $.ajax({
            url: 'http://localhost:5000/api/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username, password }),
            success: function(data) {
                token = data.token;
                $('#auth-status').text('Login successful');
                loadBookmarks();
            },
            error: function(error) {
                console.error(error);
                $('#auth-status').text('Login failed');
            }
        });
    });

    $(document).on('click', '.bookmark', function() {
        const verseId = $(this).data('id');

        $.ajax({
            url: 'http://localhost:5000/api/bookmark',
            method: 'POST',
            headers: { 'Authorization': token },
            contentType: 'application/json',
            data: JSON.stringify({ verseId }),
            success: function(data) {
                alert('Verse bookmarked');
            },
            error: function(error) {
                console.error(error);
                alert('Failed to bookmark verse');
            }
        });
    });

    function loadBookmarks() {
        $.ajax({
            url: 'http://localhost:5000/api/bookmarks',
            method: 'GET',
            headers: { 'Authorization': token },
            success: function(data) {
                let bookmarksHtml = '<h2>Bookmarks</h2>';
                data.forEach(verse => {
                    bookmarksHtml += `<div>${verse.book} ${verse.chapter}:${verse.verse} - ${verse.text}</div>`;
                });
                $('#bookmarks').html(bookmarksHtml);
            },
            error: function(error) {
                console.error(error);
                $('#bookmarks').text('Failed to load bookmarks');
            }
        });
    }

    // Fetch the daily verse
    $.ajax({
        url: 'http://localhost:5000/api/dailyverse',
        method: 'GET',
        success: function(data) {
            $('#daily-verse').html(`Daily Verse: ${data.book} ${data.chapter}:${data.verse} - ${data.text}`);
        },
        error: function(error) {
            console.error(error);
            $('#daily-verse').text('Failed to load daily verse');
        }
    });
});

