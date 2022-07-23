from PIL import Image
import numpy as np
from wordcloud import WordCloud, ImageColorGenerator
from flask_cors import CORS, cross_origin
from io import StringIO

from flask import Flask, jsonify, request, send_file, Response

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["POST"])
@cross_origin(origin='*')
def immortalizer():
    with open("words.txt", "a+") as f:
        req = request.get_json()
        if req["word"]:
            sentence = req["word"] + '\n'
            f.write(sentence)

    text = open('words.txt').read()
    if text:
        comments_maskrgb = np.array(Image.open("comments_mask.png"))
        # comments_maskrgb = np.stack((comments_mask * 255, ) * 3, axis=-1)
        comments_maskrgba = np.insert(
            comments_maskrgb,
            3,  #position in the pixel value [ r, g, b, a <-index [3]  ]
            255,  # or 1 if you're going for a float data type as you want the alpha to be fully white otherwise the entire image will be transparent.
            axis=
            2,  #this is the depth where you are inserting this alpha channel into
        )
        colors = np.array(Image.open("colors.png"))
        image_colors = ImageColorGenerator(colors)
        wordcloud = WordCloud(max_words=1000,
                              min_font_size=(6),
                              max_font_size=(35),
                              color_func=(image_colors),
                              font_path=("notonerdfont.ttf"),
                              mask=comments_maskrgba,
                              contour_width=2,
                              contour_color='rgb(139, 233, 253)',
                              background_color=None,
                              mode="RGBA").generate(text)

        comments_mask = np.array(Image.open("colors.png"))
        wordcloud.to_file("wordcloud.png")
        return send_file("wordcloud.png", mimetype="image/png")
        # return Response(wordcloud.to_svg(), mimetype="image/svg+xml")
    else:
        return "No words to make wordcloud", 300
