def intra_fetch_activities(intra_token: str, ddos_cookies : dict, start_date: str, end_date: str):
    try:
        ddos_cookies["user"] = intra_token
        response = requests.get("https://intra.epitech.eu/module/board", params={
            "start": start_date,
            "end": end_date,
            "format": "json",
        }, cookies=ddos_cookies, headers={
            "User-Agent": INTRA_USERAGENT
        })
        if response.status_code != 200:
            return False
        return response.json()
    except Exception as e:
        log_error("Intranet fetch activity error: " + str(e))
    return False