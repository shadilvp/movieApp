import React from "react";
import styled from "styled-components";

interface MovieCardProps {
  title: string;
  director: string;
  type: string;
  runtime: string;
  year: string;
  poster: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  director,
  type,
  runtime,
  year,
  poster,
}) => {
  return (
    <StyledWrapper>
      <div className="card">
        <b />
        <img src={poster} alt={title} />
        <div className="content">
          <p className="title">
            {title}
            <br />
            <span>{director} &bull; {type}</span>
            <br />
            <span>{runtime} &bull; {year}</span>
          </p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 190px;
    height: 254px;
    background: #f00;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(315deg,#03a9f4,#ff0058);
  }

  .card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(315deg,#03a9f4,#ff0058);
    filter: blur(30px);
  }

  .card b {
    position: absolute;
    inset: 2px;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2;
  }

  .card img {
    position: absolute;
    z-index: 3;
    scale: 0.8;
    opacity: 0.25;
    transition: 0.5s;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .card:hover img {
    scale: 0.5;
    opacity: 0.9;
    transform: translateY(-70px);
  }

  .card .content {
    position: absolute;
    z-index: 3;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: scale(0);
    transition: 0.5s;
  }

  .card:hover .content {
    transform: scale(1);
    bottom: 25px;
  }

  .content .title {
    position: relative;
    color: #fff;
    font-weight: 500;
    line-height: 1em;
    font-size: 1em;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-align: center;
  }

  .content .title span {
    font-weight: 300;
    font-size: 0.70em;
  }

  .content .sci {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 5px;
  }

  .sci li {
    list-style: none;
  }

  .sci li .fa-brands {
    width: 14px;
  }

  .sci li .fa-facebook {
    width: 10px;
  }

  .sci li a {
    position: relative;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.5);
    background: rgba(0, 0, 0, 0.2);
    fill: currentColor;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    transition: 0.5s;
  }

  .sci li a:hover {
    fill: currentColor;
    color: rgba(255, 255, 255, 1);
  }
`;

export default MovieCard;
