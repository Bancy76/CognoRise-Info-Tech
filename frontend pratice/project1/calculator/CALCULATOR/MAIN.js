document.addEventListener('DOMContentLoaded', function () {
    const display = document.querySelector('input[name="display"]');
    const buttons = document.querySelectorAll('input[type="button"]');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = button.value;

            if (value === 'AC') {
                // Clear the display
                display.value = '';
            } else if (value === 'DE') {
                // Delete the last character
                display.value = display.value.slice(0, -1);
            } else if (value === '=') {
                // Calculate the result
                try {
                    display.value = eval(display.value.replace(/x/g, '*').replace(/÷/g, '/'));
                } catch (e) {
                    display.value = 'Error';
                }
            } else {
                // Append the button value to the display
                display.value += value;
            }
        });
    });
});