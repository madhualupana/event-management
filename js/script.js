$(document).ready(function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    const events = [
        {
            id: 1,
            title: "Gala Dinner & Auction",
            date: "2025-05-13",
            time: "19:00",
            location: "Gachibowli, Hyderabad",
            description: "An exclusive black-tie gala dinner featuring a live auction of rare art pieces with proceeds going to charity. Enjoy a 5-course meal prepared by Michelin-starred chefs.",
            image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            price: 250,
            category: "Charity"
        },
        {
            id: 2,
            title: "Tech Summit 2025",
            date: "2025-05-15",
            time: "09:00",
            location: "Gachibowli, Hyderabad",
            description: "The premier technology conference featuring keynote speakers from leading tech companies, workshops, and networking opportunities with industry leaders.",
            image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            price: 399,
            category: "Conference"
        },
        {
            id: 3,
            title: "Jazz Night Under the Stars",
            date: "2025-05-22",
            time: "20:30",
            location: "Gachibowli, Hyderabad",
            description: "An intimate evening of smooth jazz performances by world-renowned artists in a breathtaking rooftop setting with panoramic city views.",
            image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            price: 120,
            category: "Music"
        },
        {
            id: 4,
            title: "Wine Tasting Masterclass",
            date: "2025-05-28",
            time: "18:00",
            location: "Gachibowli, Hyderabad",
            description: "A guided tasting of rare and premium wines from around the world, led by a master sommelier. Includes gourmet cheese pairings.",
            image: "https://images.unsplash.com/photo-1551751299-1b51cab2694c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
            price: 180,
            category: "Food & Drink"
        },
        {
            id: 5,
            title: "Fashion Week Preview",
            date: "2025-05-30",
            time: "14:00",
            location: "Gachibowli, Hyderabad",
            description: "An exclusive preview of upcoming fashion collections from top designers before they hit the runway. Includes meet-and-greet with designers.",
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            price: 300,
            category: "Fashion"
        },
        {
            id: 6,
            title: "Leadership Workshop",
            date: "2025-06-28",
            time: "10:00",
            location: "Gachibowli, Hyderabad",
            description: "A transformative leadership development program led by renowned business coaches and CEOs. Limited to 25 participants for personalized attention.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
            price: 450,
            category: "Workshop"
        },
    ];

   

    initCalendar([...events]);

    displayUpcomingEvents(events);

    $('#eventSearch').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        if (searchTerm.length > 0) {
            const filteredEvents = events.filter(event => 
                event.title.toLowerCase().includes(searchTerm) || 
                event.description.toLowerCase().includes(searchTerm) ||
                event.category.toLowerCase().includes(searchTerm)
            );
            displayUpcomingEvents(filteredEvents);
        } else {
            displayUpcomingEvents(events);
        }
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 30) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top - 70,
            },
            0,
            'easeInOutExpo'
        );
    });

    function displayUpcomingEvents(eventsToDisplay) {
        const eventsContainer = $('#eventsContainer');
        eventsContainer.empty();

        if (eventsToDisplay.length === 0) {
            eventsContainer.html('<div class="col-12 text-center py-5"><h4>No events found matching your search</h4></div>');
            return;
        }

        eventsToDisplay.forEach((event, index) => {
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
            });

            const eventCard = `
                <div class="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="card event-card h-100">
                        <div class="event-img">
                            <img src="${event.image}" alt="${event.title}" class="img-fluid">
                            <div class="event-category">${event.category}</div>
                        </div>
                        <div class="card-body event-body">
                            <div class="event-date"><i class="far fa-calendar-alt"></i> ${formattedDate} • ${event.time}</div>
                            <h5 class="card-title event-title">${event.title}</h5>
                            <p class="card-text event-description">${event.description}</p>
                            <div class="event-footer">
                                <div class="event-price">$${event.price}</div>
                                <button class="btn btn-outline-primary btn-sm view-details" data-id="${event.id}">Details <i class="fas fa-arrow-right ms-1"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            eventsContainer.append(eventCard);
        });

        AOS.refresh();

        $('.view-details').click(function() {
            const eventId = parseInt($(this).data('id'));
            const selectedEvent = [...events].find(e => e.id === eventId);
            showEventDetails(selectedEvent);
        });
    }

    function showEventDetails(event) {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
        });

        const modalContent = `
            <div class="row">
                <div class="col-md-6 mb-4 mb-md-0">
                    <img src="${event.image}" alt="${event.title}" class="img-fluid rounded-3 shadow">
                </div>
                <div class="col-md-6">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <span class="badge bg-primary mb-2">${event.category}</span>
                            <h4 class="mb-1">${event.title}</h4>
                        </div>
                        <h4 class="text-primary">$${event.price}</h4>
                    </div>
                    
                    <div class="event-meta mb-4">
                        <p class="mb-2"><i class="far fa-calendar-alt me-2"></i> ${formattedDate} at ${event.time}</p>
                        <p class="mb-0"><i class="fas fa-map-marker-alt me-2"></i> ${event.location}</p>
                    </div>
                    
                    <div class="event-description">
                        <h5 class="mb-3">Event Details</h5>
                        <p>${event.description}</p>
                    </div>
                    
                    <div class="mt-4 pt-3 border-top">
                        <h5 class="mb-3">Additional Information</h5>
                        <ul class="list-unstyled">
                            <li class="mb-2"><i class="fas fa-check-circle text-primary me-2"></i> Premium seating included</li>
                            <li class="mb-2"><i class="fas fa-check-circle text-primary me-2"></i> Complimentary valet parking</li>
                            <li class="mb-2"><i class="fas fa-check-circle text-primary me-2"></i> Exclusive access to VIP lounge</li>
                            <li><i class="fas fa-check-circle text-primary me-2"></i> Personalized concierge service</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        $('#eventModalTitle').text(event.title);
        $('#eventModalBody').html(modalContent);
        $('#eventModal').modal('show');
    }

     function initCalendar(allEvents) {
        const calendarEl = document.getElementById('calendarEl');
        
        const calendarEvents = allEvents.map(event => ({
            title: event.title,
            start: event.date,
            extendedProps: {
                description: event.description,
                image: event.image,
                time: event.time,
                location: event.location,
                price: event.price,
                category: event.category
            }
        }));

        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            events: calendarEvents,
            eventClick: function(info) {
                const clickedEvent = allEvents.find(e => e.title === info.event.title);
                showEventDetails(clickedEvent);
                info.jsEvent.preventDefault();
            },
            eventContent: function(arg) {
                const eventEl = document.createElement('div');
                eventEl.classList.add('fc-event-main');
                
                const dotEl = document.createElement('span');
                dotEl.classList.add('event-dot');
                dotEl.style.backgroundColor = getCategoryColor(arg.event.extendedProps.category);
                
                const titleEl = document.createElement('span');
                titleEl.textContent = arg.event.title;
                
                eventEl.appendChild(dotEl);
                eventEl.appendChild(titleEl);
                
                return { domNodes: [eventEl] };
            },
            dayHeaderClassNames: function(arg) {
                if (arg.date.getDay() === 0 || arg.date.getDay() === 6) {
                    return ['fc-day-weekend'];
                }
                return [];
            },
            dayCellClassNames: function(arg) {
                if (arg.date.getDay() === 0 || arg.date.getDay() === 6) {
                    return ['fc-day-weekend'];
                }
                return [];
            },
            height: 'auto',
            contentHeight: 'auto'
        });

        calendar.render();

        function getCategoryColor(category) {
            const colors = {
                'Charity': '#6c63ff',
                'Conference': '#4CAF50',
                'Music': '#FF9800',
                'Food & Drink': '#E91E63',
                'Fashion': '#9C27B0',
                'Workshop': '#2196F3',
                'Art': '#00BCD4'
            };
            return colors[category] || '#607D8B';
        }
    }

    $(document).on('click', '#eventModal .btn-primary', function(e) {
        e.preventDefault();
        $('#eventModal').modal('hide');
        
        $('.success-popup').addClass('active');
    });

    $(document).on('click', '.close-popup', function() {
        $('.success-popup').removeClass('active');
    });

    $(document).on('click', '.success-popup', function(e) {
        if ($(e.target).hasClass('success-popup')) {
            $(this).removeClass('active');
        }
    });

    $('.contact-form').on('submit', function(e) {
        e.preventDefault();
        
        $('.contact-popup').addClass('active');
        
        this.reset();
    });

    $(document).on('click', '.close-contact-popup', function() {
        $('.contact-popup').removeClass('active');
    });

    $(document).on('click', '.contact-popup', function(e) {
        if ($(e.target).hasClass('contact-popup')) {
            $(this).removeClass('active');
        }
    });

    $('#eventModal').on('show.bs.modal', function() {
        $(this).find('.modal-content').removeClass().addClass('modal-content animate__animated animate__fadeInUp');
    });

    $('#eventModal').on('hide.bs.modal', function() {
        $(this).find('.modal-content').removeClass().addClass('modal-content animate__animated animate__fadeOutDown');
    });

    $(document).on('click', '.btn-book', function(e) {
        e.preventDefault();
        $('#eventModal').modal('hide');
        
        $('.success-popup').addClass('active');
    });
});