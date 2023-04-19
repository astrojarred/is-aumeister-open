import os
import modal

my_image = modal.Image.debian_slim().pip_install("beautifulsoup4", "requests", "discord-webhook")
stub = modal.Stub(name="aumeister_info")


@stub.function(image=my_image, secret=modal.Secret.from_name("flamingo-discord-url"), schedule=modal.Cron("0 11 * * *"))
def get_aumeister_info():
    from bs4 import BeautifulSoup
    import requests
    from discord_webhook import DiscordWebhook, DiscordEmbed
    
    DISCORD_WEBHOOK_URL = os.environ["DISCORD_WEBHOOK_URL"]
    
    url = "https://www.aumeister.de/willkommen/"
    
    
    try:
        open_response = requests.get(url)
        html = open_response.text
        soup = BeautifulSoup(html, "html.parser")
        target_element = soup.select_one("div#c769 p.text-center")
        extracted_text = target_element.get_text()

        is_open = "geöffnet" in extracted_text
        color = 3066993 if is_open else 15158332
        title = "🍻 Aumeister is OPEN today!" if is_open else "Aumeister is CLOSED today."

        embed = DiscordEmbed(title=title, description=extracted_text, color=color, url="http://isaumeisteropen.com.de")
        embed.set_timestamp()
        webhook = DiscordWebhook(url=DISCORD_WEBHOOK_URL)
        webhook.add_embed(embed)
        response = webhook.execute()
        
        print(response)

        return {"open": is_open, "message": extracted_text, "note": title}
    except Exception as e:
        print("Error:", e)
        raise Exception("Error fetching from the aumeister website.")


@stub.local_entrypoint()
def main():
    result = get_aumeister_info.call()
    print(result)
    