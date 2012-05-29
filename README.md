# jquery.squeezebox
## by David Kennedy
## http://daveden.wordpress.com

### Overview

A squeezebox is another name for an accordion. The HTML should look something like this:

    <div id="squeezebox">
        <div>
            <h3>
                A header
            </h3>
            <p>
                Some content
            </p>
        </div>
        <div>
            <h3>
                A header
            </h3>
            <p>
                Some content
            </p>
        </div>
        <div>
            <h3>
                A header
            </h3>
            <p>
                Some content
            </p>
        </div>
    </div>

A call to:

    $("#squeezebox").squeezebox();

will initialize a squeezebox instance.

### Options

#### event - String - Default: "click"
The event that causes the active panel to change. Possible values are "click" or "mouseover."

Example:

    $("#squeezebox").squeezebox({ event: "mouseover" });
