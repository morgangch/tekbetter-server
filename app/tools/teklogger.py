class Colors:
    RED = '\033[91m'
    DARK_RED = '\033[31m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    DARK_YELLOW = '\033[33m'
    BLUE = '\033[94m'
    LIGHT_BLUE = '\033[34m'
    MAGENTA = '\033[95m'
    CYAN = '\033[96m'
    WHITE = '\033[97m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    END = '\033[0m'


def log_info(message):
    print(f"[{Colors.CYAN}INFO{Colors.END}] {message}")


def log_error(message):
    print(
        f"[{Colors.RED}ERROR{Colors.END}] {Colors.DARK_RED}{message}{Colors.END}")


def log_warning(message):
    print(
        f"[{Colors.YELLOW}WARN{Colors.END}] {Colors.DARK_YELLOW}{message}{Colors.END}")


def log_success(message):
    print(f"[{Colors.GREEN}SUCCESS{Colors.END}] {message}")


def log_debug(message):
    print(
        f"[{Colors.BLUE}DEBUG{Colors.END}] {Colors.LIGHT_BLUE}{message}{Colors.END}")
