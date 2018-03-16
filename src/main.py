def main():
    # main should be the shell process
    run_as_background(run_ride_maker)

def run_ride_maker():
    while true:
        populate_node()
        all_users = fetch_all_users()
        make_rides(all_users)
        sleep(13 hours)

def make_rides(users):
        riders = [for x in users if x is "rider"]
        drivers = [for x in users if x is "driver"]
        all_ride_requests = []
        for d in drivers:
            nearby_riders = [r for r in riders if get_distance(r.location, d.location) < MAX_RADIUS]
            nearby_riders = sort(nearby_riders by get_timegap(d.schedule, r.schedule))
            eligible_riders = nearby_riders[0: d.capacity]
            ride_request = create_ride_request(d, eligible_riders)
            riders.remove(eligible_riders)
            all_ride_requests.append(ride_request)
        broadcast(ride_requests)

def event_listener():
    listen_for([ 
        driver_accept_request,
        rider_accept_request,
        driver_ignore_request,
        rider_ignore_request
    ])

def driver_accept_request(driver, list_of_riders):
    make_link_between(driver, list_of_riders)

def rider_accept_request(rider, driver):
    make_link_between(rider, driver)

def driver_reject_request(driver, list_of_riders, reason):
    kill_existing_link_between(driver, list_of_riders)
    make_rides(fetch_user_that_have_no_links())
    if reason == "Not working tomorrow":
        remove_node(driver)
    if reason == "I want to become rider tomorrow":
        change_node_identity(driver, "rider")
    # possible reasons are :
    # - the user does not reply to the prompt in a specified timeframe
    # - the user request for a rematch (with a maximum limit)

def rider_reject_request(rider, driver, reason):
    kill_existing_link_between(rider, driver)
    make_rides(fetch_user_that_have_no_links())
    if reason == "Not working tomrrow":
        remove_node(rider)